import { Injectable, NotFoundException } from "@nestjs/common";
import { withTenant } from "@vast/db";
import type { CreateTaskDto } from "./dto/create-task.dto";
import type { UpdateTaskDto } from "./dto/update-task.dto";

// Every method runs inside withTenant(), so RLS scopes all queries to this tenant.
@Injectable()
export class TasksService {
  create(tenantId: string, dto: CreateTaskDto) {
    return withTenant(tenantId, (tx) =>
      tx.task.create({
        data: {
          tenantId,
          title: dto.title,
          status: dto.status,
          dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
        },
      }),
    );
  }

  findAll(tenantId: string) {
    return withTenant(tenantId, (tx) =>
      tx.task.findMany({ orderBy: [{ status: "asc" }, { createdAt: "desc" }], take: 200 }),
    );
  }

  async update(tenantId: string, id: string, dto: UpdateTaskDto) {
    await this.ensure(tenantId, id);
    return withTenant(tenantId, (tx) =>
      tx.task.update({
        where: { id },
        data: {
          title: dto.title,
          status: dto.status,
          dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
        },
      }),
    );
  }

  async remove(tenantId: string, id: string) {
    await this.ensure(tenantId, id);
    await withTenant(tenantId, (tx) => tx.task.delete({ where: { id } }));
    return { id, deleted: true };
  }

  private async ensure(tenantId: string, id: string) {
    const task = await withTenant(tenantId, (tx) => tx.task.findUnique({ where: { id } }));
    if (!task) throw new NotFoundException("Task not found");
    return task;
  }
}
