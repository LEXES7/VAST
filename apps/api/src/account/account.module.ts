import { Module } from "@nestjs/common";
import { OnboardingController } from "./onboarding.controller";
import { OnboardingService } from "./onboarding.service";
import { MeController } from "./me.controller";

@Module({
  controllers: [OnboardingController, MeController],
  providers: [OnboardingService],
})
export class AccountModule {}
