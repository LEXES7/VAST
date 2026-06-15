import { Injectable, NotFoundException } from "@nestjs/common";
import { withTenant, type Deal } from "@vast/db";
import type { CreateDealDto } from "./dto/create-deal.dto";
import type { UpdateDealDto } from "./dto/update-deal.dto";

// Explicit return types keep Prisma's Decimal runtime type from leaking into
// inferred signatures (TS2742). Every method runs inside withTenant(), so RLS
// scopes all queries to this tenant.
@Injectable()
export class DealsService {
  create(tenantId: string, dto: CreateDealDto): Promise<Deal> {
    return withTenant(tenantId, (tx) =>
      tx.deal.create({ data: { ...dto, tenantId } }),
    );
  }

  findAll(tenantId: string, take = 100, skip = 0): Promise<Deal[]> {
    const limit = Math.min(Math.max(take, 1), 200);
    return withTenant(tenantId, (tx) =>
      tx.deal.findMany({
        take: limit,
        skip: Math.max(skip, 0),
        orderBy: { createdAt: "desc" },
      }),
    );
  }

  async findOne(tenantId: string, id: string): Promise<Deal> {
    const deal = await withTenant(tenantId, (tx) =>
      tx.deal.findUnique({ where: { id } }),
    );
    if (!deal) throw new NotFoundException("Deal not found");
    return deal;
  }

  async update(tenantId: string, id: string, dto: UpdateDealDto): Promise<Deal> {
    await this.findOne(tenantId, id);
    return withTenant(tenantId, (tx) =>
      tx.deal.update({ where: { id }, data: dto }),
    );
  }

  async remove(tenantId: string, id: string): Promise<{ id: string; deleted: true }> {
    await this.findOne(tenantId, id);
    await withTenant(tenantId, (tx) => tx.deal.delete({ where: { id } }));
    return { id, deleted: true };
  }
}
