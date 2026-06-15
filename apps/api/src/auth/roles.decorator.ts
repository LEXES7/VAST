import { SetMetadata } from "@nestjs/common";
import type { Role } from "@vast/shared";

export const ROLES_KEY = "roles";

/** Restricts a route to the listed roles. Enforced server-side by RolesGuard. */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
