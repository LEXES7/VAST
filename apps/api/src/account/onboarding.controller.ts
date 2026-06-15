import { Body, Controller, Post } from "@nestjs/common";
import { AuthOnly } from "../auth/auth-only.decorator";
import { AuthClaims } from "../auth/auth-claims.decorator";
import type { VerifiedClaims } from "../auth/supabase-token.verifier";
import { OnboardingService } from "./onboarding.service";
import { CreateTenantDto } from "./dto/create-tenant.dto";

// Reachable by an authenticated user who does NOT yet belong to a tenant.
@Controller("onboarding")
export class OnboardingController {
  constructor(private readonly onboarding: OnboardingService) {}

  @AuthOnly()
  @Post("tenant")
  createTenant(@AuthClaims() claims: VerifiedClaims, @Body() dto: CreateTenantDto) {
    return this.onboarding.createTenant(claims, dto);
  }
}
