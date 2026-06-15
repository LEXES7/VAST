import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { Request } from "express";
import type { VerifiedClaims } from "./supabase-token.verifier";

/** Injects the verified token claims (no tenant required). For @AuthOnly routes. */
export const AuthClaims = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): VerifiedClaims => {
    const request = ctx.switchToHttp().getRequest<Request & { claims?: VerifiedClaims }>();
    if (!request.claims) {
      throw new Error("AuthClaims used on a route without authentication");
    }
    return request.claims;
  },
);
