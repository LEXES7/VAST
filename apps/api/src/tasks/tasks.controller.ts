import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { CurrentUser } from "../auth/current-user.decorator";
import type { CurrentUser as Principal } from "../auth/current-user";
import { Roles } from "../auth/roles.decorator";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasks: TasksService) {}

  @Roles("owner", "admin", "member")
  @Post()
  create(@CurrentUser() user: Principal, @Body() dto: CreateTaskDto) {
    return this.tasks.create(user.tenantId, dto);
  }

  @Get()
  findAll(@CurrentUser() user: Principal) {
    return this.tasks.findAll(user.tenantId);
  }

  @Roles("owner", "admin", "member")
  @Patch(":id")
  update(
    @CurrentUser() user: Principal,
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.tasks.update(user.tenantId, id, dto);
  }

  @Roles("owner", "admin", "member")
  @Delete(":id")
  remove(@CurrentUser() user: Principal, @Param("id", ParseUUIDPipe) id: string) {
    return this.tasks.remove(user.tenantId, id);
  }
}
