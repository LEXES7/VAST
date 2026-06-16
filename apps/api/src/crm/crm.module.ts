import { Module } from "@nestjs/common";
import { ContactsController } from "./contacts.controller";
import { ContactsService } from "./contacts.service";
import { CompaniesController } from "./companies.controller";
import { CompaniesService } from "./companies.service";
import { DealsController } from "./deals.controller";
import { DealsService } from "./deals.service";
import { OverviewController } from "./overview.controller";
import { OverviewService } from "./overview.service";

@Module({
  controllers: [ContactsController, CompaniesController, DealsController, OverviewController],
  providers: [ContactsService, CompaniesService, DealsService, OverviewService],
})
export class CrmModule {}
