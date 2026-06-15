import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import type { Request } from "express";
import { IS_PUBLIC_KEY } from "./public.decorator";
import type { CurrentUser } from "./current-user";

/**
 * Deny-by-default authentication guard. Every route requires a verified session
 * unless explicitly marked @Public(). Registered globally in AppModule.
 *
 * NOTE: token verification is stubbed until the auth provider (Supabase Auth) is
 * wired. It currently rejects all non-public requests so nothing is accidentally
 * left open. Replace `verifyToken` with real JWT/JWKS verification then.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractBearerToken(request);
    if (!token) {
      throw new UnauthorizedException("Missing bearer token");
    }

    const user = await this.verifyToken(token);
    if (!user) {
      throw new UnauthorizedException("Invalid or expired token");
    }

    // Attach the verified principal; controllers read it via @CurrentUser().
    (request as Request & { user?: CurrentUser }).user = user;
    return true;
  }

  private extractBearerToken(request: Request): string | null {
    const header = request.headers.authorization;
    if (!header?.startsWith("Bearer ")) return null;
    return header.slice("Bearer ".length).trim() || null;
  }

  // TODO(auth): verify the JWT against the provider's JWKS, then map claims to
  // a CurrentUser (resolve tenant membership + role). Until then, deny.
  private async verifyToken(_token: string): Promise<CurrentUser | null> {
    return null;
  }
}
