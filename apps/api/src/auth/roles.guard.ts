import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import type { Request } from "express";
import type { Role } from "@vast/shared";
import { ROLES_KEY } from "./roles.decorator";
import type { CurrentUser } from "./current-user";

/**
 * Enforces @Roles() server-side. Runs after AuthGuard, so request.user is set.
 * Authorization is decided on the server only — never trusted from the client.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!required || required.length === 0) return true;

    const request = context.switchToHttp().getRequest<Request & { user?: CurrentUser }>();
    const user = request.user;
    if (!user || !required.includes(user.role)) {
      throw new ForbiddenException("Insufficient role");
    }
    return true;
  }
}
