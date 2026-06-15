import { Controller, Get } from "@nestjs/common";
import { CurrentUser } from "../auth/current-user.decorator";
import type { CurrentUser as Principal } from "../auth/current-user";

// Returns the resolved principal for the current tenant. Requires a tenant
// (default guard), so the frontend can use a 403 here to send the user to onboarding.
@Controller("me")
export class MeController {
  @Get()
  me(@CurrentUser() user: Principal) {
    return user;
  }
}
