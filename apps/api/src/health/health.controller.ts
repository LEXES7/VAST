import { Controller, Get } from "@nestjs/common";
import { VAST } from "@vast/shared";

@Controller("health")
export class HealthController {
  @Get()
  check() {
    return {
      status: "ok",
      service: VAST.name,
      time: new Date().toISOString(),
    };
  }
}
