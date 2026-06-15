import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import type { Request } from "express";
import { IS_PUBLIC_KEY } from "./public.decorator";
import type { CurrentUser } from "./current-user";
import { SupabaseTokenVerifier } from "./supabase-token.verifier";
import { TenantResolver } from "./tenant-resolver.service";

/**
 * Deny-by-default authentication guard. Every route requires a verified Supabase
 * session unless explicitly marked @Public(). Registered globally in AppModule.
 *
 * Flow: verify JWT signature/issuer/audience -> resolve tenant membership + role
 * from the DB -> attach the principal. Tenant comes from the verified identity
 * (+ verified X-Tenant-Id membership), never from unverified client input.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly verifier: SupabaseTokenVerifier,
    private readonly tenantResolver: TenantResolver,
  ) {}

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

    const claims = await this.verifier.verify(token);
    if (!claims) {
      throw new UnauthorizedException("Invalid or expired token");
    }

    const requestedTenant = this.readTenantHeader(request);
    const user = await this.tenantResolver.resolve(claims, requestedTenant);
    if (!user) {
      throw new ForbiddenException("No access to the requested tenant");
    }

    (request as Request & { user?: CurrentUser }).user = user;
    return true;
  }

  private extractBearerToken(request: Request): string | null {
    const header = request.headers.authorization;
    if (!header?.startsWith("Bearer ")) return null;
    return header.slice("Bearer ".length).trim() || null;
  }

  private readTenantHeader(request: Request): string | undefined {
    const value = request.headers["x-tenant-id"];
    if (typeof value === "string" && value.trim()) return value.trim();
    return undefined;
  }
}
