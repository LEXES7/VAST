import { Global, Module } from "@nestjs/common";
import { SupabaseTokenVerifier } from "./supabase-token.verifier";
import { TenantResolver } from "./tenant-resolver.service";

// Global so the app-wide AuthGuard (registered in AppModule) can inject these.
@Global()
@Module({
  providers: [SupabaseTokenVerifier, TenantResolver],
  exports: [SupabaseTokenVerifier, TenantResolver],
})
export class AuthModule {}
