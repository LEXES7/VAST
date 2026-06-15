import { Injectable, Logger } from "@nestjs/common";
import { createRemoteJWKSet, jwtVerify, type JWTPayload } from "jose";

export interface VerifiedClaims {
  sub: string;
  email?: string;
}

/**
 * Verifies Supabase-issued JWTs using the project's public JWKS (asymmetric
 * signing). This needs no shared secret — we only ever hold public keys — and
 * checks the signature, issuer, audience, and expiry. Verification happens
 * locally after the keys are fetched, so it's fast and offline-resilient.
 */
@Injectable()
export class SupabaseTokenVerifier {
  private readonly logger = new Logger(SupabaseTokenVerifier.name);
  private readonly issuer: string;
  private readonly jwks: ReturnType<typeof createRemoteJWKSet>;

  constructor() {
    const url = process.env.SUPABASE_URL;
    if (!url) {
      this.logger.warn("SUPABASE_URL is not set — all token verification will fail.");
    }
    this.issuer = `${url ?? ""}/auth/v1`;
    this.jwks = createRemoteJWKSet(
      new URL(`${url ?? ""}/auth/v1/.well-known/jwks.json`),
    );
  }

  async verify(token: string): Promise<VerifiedClaims | null> {
    try {
      const { payload } = await jwtVerify(token, this.jwks, {
        issuer: this.issuer,
        audience: "authenticated",
      });
      return this.toClaims(payload);
    } catch (err) {
      this.logger.debug(`Token verification failed: ${(err as Error).message}`);
      return null;
    }
  }

  private toClaims(payload: JWTPayload): VerifiedClaims | null {
    if (typeof payload.sub !== "string") return null;
    const email = typeof payload.email === "string" ? payload.email : undefined;
    return { sub: payload.sub, email };
  }
}
