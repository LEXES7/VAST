import { Controller, Get } from "@nestjs/common";
import { CurrentUser } from "../auth/current-user.decorator";
import type { CurrentUser as Principal } from "../auth/current-user";
import { OverviewService } from "./overview.service";

@Controller("overview")
export class OverviewController {
  constructor(private readonly overview: OverviewService) {}

  @Get()
  get(@CurrentUser() user: Principal) {
    return this.overview.get(user.tenantId);
  }
}
