import { Controller, Get } from "@nestjs/common";
import { VAST } from "@vast/shared";
import { Public } from "../auth/public.decorator";

@Controller("health")
export class HealthController {
  @Public()
  @Get()
  check() {
    return {
      status: "ok",
      service: VAST.name,
      time: new Date().toISOString(),
    };
  }
}
