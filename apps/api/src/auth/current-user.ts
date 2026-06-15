import type { Role } from "@vast/shared";

/**
 * The authenticated principal for a request.
 *
 * This is populated by AuthGuard from a verified session/JWT (Supabase Auth once
 * wired). Tenant context is derived ONLY from this verified value — never from a
 * client-supplied header or body field — which is what prevents tenant spoofing.
 */
export interface CurrentUser {
  userId: string;
  tenantId: string;
  role: Role;
  email: string;
}
