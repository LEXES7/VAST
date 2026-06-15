import { Injectable, NotFoundException } from "@nestjs/common";
import { withTenant } from "@vast/db";
import type { CreateCompanyDto } from "./dto/create-company.dto";
import type { UpdateCompanyDto } from "./dto/update-company.dto";

// Every method runs inside withTenant(), so RLS scopes all queries to this tenant.
@Injectable()
export class CompaniesService {
  create(tenantId: string, dto: CreateCompanyDto) {
    return withTenant(tenantId, (tx) =>
      tx.company.create({ data: { ...dto, tenantId } }),
    );
  }

  findAll(tenantId: string, take = 50, skip = 0) {
    const limit = Math.min(Math.max(take, 1), 100);
    return withTenant(tenantId, (tx) =>
      tx.company.findMany({
        take: limit,
        skip: Math.max(skip, 0),
        orderBy: { createdAt: "desc" },
      }),
    );
  }

  async findOne(tenantId: string, id: string) {
    const company = await withTenant(tenantId, (tx) =>
      tx.company.findUnique({ where: { id } }),
    );
    if (!company) throw new NotFoundException("Company not found");
    return company;
  }

  async update(tenantId: string, id: string, dto: UpdateCompanyDto) {
    await this.findOne(tenantId, id);
    return withTenant(tenantId, (tx) =>
      tx.company.update({ where: { id }, data: dto }),
    );
  }

  async remove(tenantId: string, id: string) {
    await this.findOne(tenantId, id);
    await withTenant(tenantId, (tx) => tx.company.delete({ where: { id } }));
    return { id, deleted: true };
  }
}
