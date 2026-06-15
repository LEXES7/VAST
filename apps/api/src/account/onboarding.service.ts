import { BadRequestException, Injectable } from "@nestjs/common";
import { prisma } from "@vast/db";
import type { VerifiedClaims } from "../auth/supabase-token.verifier";
import type { CreateTenantDto } from "./dto/create-tenant.dto";

@Injectable()
export class OnboardingService {
  /**
   * Creates a new organization and makes the current user its owner.
   * Provisions the user record from the verified token if it doesn't exist.
   * Tenant + membership are created atomically.
   */
  async createTenant(claims: VerifiedClaims, dto: CreateTenantDto) {
    if (!claims.email) {
      throw new BadRequestException("An email is required to create an organization");
    }

    await prisma.user.upsert({
      where: { id: claims.sub },
      update: { email: claims.email },
      create: { id: claims.sub, email: claims.email },
    });

    const slug = await this.uniqueSlug(dto.slug ?? this.slugify(dto.name));

    const tenant = await prisma.$transaction(async (tx) => {
      const created = await tx.tenant.create({ data: { name: dto.name, slug } });
      await tx.membership.create({
        data: { tenantId: created.id, userId: claims.sub, role: "owner" },
      });
      return created;
    });

    return { tenant, role: "owner" as const };
  }

  private slugify(name: string): string {
    const base = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return base.length >= 2 ? base : "org";
  }

  private async uniqueSlug(base: string): Promise<string> {
    let candidate = base;
    while (await prisma.tenant.findUnique({ where: { slug: candidate } })) {
      candidate = `${base}-${Math.random().toString(36).slice(2, 6)}`;
    }
    return candidate;
  }
}
