import { Injectable } from "@nestjs/common";
import { prisma } from "@vast/db";
import type { Role } from "@vast/shared";
import type { CurrentUser } from "./current-user";
import type { VerifiedClaims } from "./supabase-token.verifier";

/**
 * Turns verified token claims into a CurrentUser by resolving the user's tenant
 * membership and role from the database (the control-plane).
 *
 * - Provisions the user on first login (id == Supabase auth uid).
 * - If a tenant is requested via the X-Tenant-Id header, membership in THAT
 *   tenant is verified — the client cannot assert a tenant it doesn't belong to.
 * - With a single membership and no header, that tenant is used.
 * - No membership => null (authenticated but not onboarded into any tenant).
 */
@Injectable()
export class TenantResolver {
  async resolve(
    claims: VerifiedClaims,
    requestedTenantId?: string,
  ): Promise<CurrentUser | null> {
    const existing = await prisma.user.findUnique({ where: { id: claims.sub } });

    // Provision on first login; require an email to create the record.
    const user =
      existing ??
      (claims.email
        ? await prisma.user.create({ data: { id: claims.sub, email: claims.email } })
        : null);
    if (!user) return null;

    const memberships = await prisma.membership.findMany({
      where: { userId: user.id },
    });
    if (memberships.length === 0) return null;

    let membership;
    if (requestedTenantId) {
      membership = memberships.find((m) => m.tenantId === requestedTenantId);
      if (!membership) return null; // not a member of the requested tenant
    } else if (memberships.length === 1) {
      membership = memberships[0];
    } else {
      return null; // ambiguous — client must specify a tenant
    }

    return {
      userId: user.id,
      tenantId: membership.tenantId,
      role: membership.role as Role,
      email: user.email,
    };
  }
}
