import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { HealthModule } from "./health/health.module";
import { AuthGuard } from "./auth/auth.guard";
import { RolesGuard } from "./auth/roles.guard";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // Global rate limit: 100 requests / minute / IP by default.
    // Auth routes will tighten this further with a stricter per-route limit.
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 100 }]),
    HealthModule,
  ],
  providers: [
    // Order matters: throttle first, then authenticate, then authorize.
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
