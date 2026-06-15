import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { CurrentUser } from "../auth/current-user.decorator";
import type { CurrentUser as Principal } from "../auth/current-user";
import { Roles } from "../auth/roles.decorator";
import { CompaniesService } from "./companies.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";

@Controller("companies")
export class CompaniesController {
  constructor(private readonly companies: CompaniesService) {}

  @Roles("owner", "admin", "member")
  @Post()
  create(@CurrentUser() user: Principal, @Body() dto: CreateCompanyDto) {
    return this.companies.create(user.tenantId, dto);
  }

  @Get()
  findAll(
    @CurrentUser() user: Principal,
    @Query("take") take?: string,
    @Query("skip") skip?: string,
  ) {
    return this.companies.findAll(
      user.tenantId,
      take ? Number(take) : undefined,
      skip ? Number(skip) : undefined,
    );
  }

  @Get(":id")
  findOne(@CurrentUser() user: Principal, @Param("id", ParseUUIDPipe) id: string) {
    return this.companies.findOne(user.tenantId, id);
  }

  @Roles("owner", "admin", "member")
  @Patch(":id")
  update(
    @CurrentUser() user: Principal,
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: UpdateCompanyDto,
  ) {
    return this.companies.update(user.tenantId, id, dto);
  }

  @Roles("owner", "admin")
  @Delete(":id")
  remove(@CurrentUser() user: Principal, @Param("id", ParseUUIDPipe) id: string) {
    return this.companies.remove(user.tenantId, id);
  }
}
