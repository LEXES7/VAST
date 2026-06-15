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
import { DealsService } from "./deals.service";
import { CreateDealDto } from "./dto/create-deal.dto";
import { UpdateDealDto } from "./dto/update-deal.dto";

@Controller("deals")
export class DealsController {
  constructor(private readonly deals: DealsService) {}

  @Roles("owner", "admin", "member")
  @Post()
  create(@CurrentUser() user: Principal, @Body() dto: CreateDealDto) {
    return this.deals.create(user.tenantId, dto);
  }

  @Get()
  findAll(
    @CurrentUser() user: Principal,
    @Query("take") take?: string,
    @Query("skip") skip?: string,
  ) {
    return this.deals.findAll(
      user.tenantId,
      take ? Number(take) : undefined,
      skip ? Number(skip) : undefined,
    );
  }

  @Get(":id")
  findOne(@CurrentUser() user: Principal, @Param("id", ParseUUIDPipe) id: string) {
    return this.deals.findOne(user.tenantId, id);
  }

  // Used to move a deal between pipeline stages (send { stage }) or edit fields.
  @Roles("owner", "admin", "member")
  @Patch(":id")
  update(
    @CurrentUser() user: Principal,
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: UpdateDealDto,
  ) {
    return this.deals.update(user.tenantId, id, dto);
  }

  @Roles("owner", "admin")
  @Delete(":id")
  remove(@CurrentUser() user: Principal, @Param("id", ParseUUIDPipe) id: string) {
    return this.deals.remove(user.tenantId, id);
  }
}
