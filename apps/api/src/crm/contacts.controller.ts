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
import { ContactsService } from "./contacts.service";
import { CreateContactDto } from "./dto/create-contact.dto";
import { UpdateContactDto } from "./dto/update-contact.dto";

// Sits behind the global AuthGuard (deny-by-default). Tenant always comes from
// the verified principal, never from the request body or a header.
@Controller("contacts")
export class ContactsController {
  constructor(private readonly contacts: ContactsService) {}

  @Roles("owner", "admin", "member")
  @Post()
  create(@CurrentUser() user: Principal, @Body() dto: CreateContactDto) {
    return this.contacts.create(user.tenantId, dto);
  }

  // Any authenticated member (including viewer) can read.
  @Get()
  findAll(
    @CurrentUser() user: Principal,
    @Query("take") take?: string,
    @Query("skip") skip?: string,
  ) {
    return this.contacts.findAll(
      user.tenantId,
      take ? Number(take) : undefined,
      skip ? Number(skip) : undefined,
    );
  }

  @Get(":id")
  findOne(@CurrentUser() user: Principal, @Param("id", ParseUUIDPipe) id: string) {
    return this.contacts.findOne(user.tenantId, id);
  }

  @Roles("owner", "admin", "member")
  @Patch(":id")
  update(
    @CurrentUser() user: Principal,
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: UpdateContactDto,
  ) {
    return this.contacts.update(user.tenantId, id, dto);
  }

  @Roles("owner", "admin")
  @Delete(":id")
  remove(@CurrentUser() user: Principal, @Param("id", ParseUUIDPipe) id: string) {
    return this.contacts.remove(user.tenantId, id);
  }
}
