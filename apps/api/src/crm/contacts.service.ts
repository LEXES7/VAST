import { Injectable, NotFoundException } from "@nestjs/common";
import { withTenant } from "@vast/db";
import type { CreateContactDto } from "./dto/create-contact.dto";
import type { UpdateContactDto } from "./dto/update-contact.dto";

// Every method runs inside withTenant(), so RLS scopes all queries to this
// tenant at the database layer. Passing tenantId explicitly on writes is
// defense in depth — the DB policy is the real guarantee.
@Injectable()
export class ContactsService {
  create(tenantId: string, dto: CreateContactDto) {
    return withTenant(tenantId, (tx) =>
      tx.contact.create({ data: { ...dto, tenantId } }),
    );
  }

  findAll(tenantId: string, take = 50, skip = 0) {
    // Cap page size to prevent unbounded reads.
    const limit = Math.min(Math.max(take, 1), 100);
    return withTenant(tenantId, (tx) =>
      tx.contact.findMany({
        take: limit,
        skip: Math.max(skip, 0),
        orderBy: { createdAt: "desc" },
      }),
    );
  }

  async findOne(tenantId: string, id: string) {
    const contact = await withTenant(tenantId, (tx) =>
      tx.contact.findUnique({ where: { id } }),
    );
    if (!contact) throw new NotFoundException("Contact not found");
    return contact;
  }

  async update(tenantId: string, id: string, dto: UpdateContactDto) {
    await this.findOne(tenantId, id); // 404 if it isn't this tenant's
    return withTenant(tenantId, (tx) =>
      tx.contact.update({ where: { id }, data: dto }),
    );
  }

  async remove(tenantId: string, id: string) {
    await this.findOne(tenantId, id);
    await withTenant(tenantId, (tx) => tx.contact.delete({ where: { id } }));
    return { id, deleted: true };
  }
}
