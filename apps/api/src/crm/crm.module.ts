import { Module } from "@nestjs/common";
import { ContactsController } from "./contacts.controller";
import { ContactsService } from "./contacts.service";
import { CompaniesController } from "./companies.controller";
import { CompaniesService } from "./companies.service";
import { DealsController } from "./deals.controller";
import { DealsService } from "./deals.service";

@Module({
  controllers: [ContactsController, CompaniesController, DealsController],
  providers: [ContactsService, CompaniesService, DealsService],
})
export class CrmModule {}
