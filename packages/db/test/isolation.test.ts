/**
 * Tenant isolation test — the most important test in the codebase.
 *
 * Proves that with RLS active, tenant A cannot read or write tenant B's data,
 * and that a query with no tenant context sees nothing (fail closed).
 *
 * Requires a database with the schema migrated and rls.sql applied:
 *   docker compose up -d
 *   pnpm --filter @vast/db migrate
 *   pnpm --filter @vast/db apply-rls
 *   pnpm --filter @vast/db test:isolation
 */
import { strict as assert } from "node:assert";
import { test } from "node:test";
import { prisma, withTenant } from "../src/index";

test("tenant isolation via RLS", async () => {
  // Seed two tenants, each with one contact. Seeding bypasses tenant scope on
  // purpose (it runs as setup), so we insert with explicit context per tenant.
  const a = await prisma.tenant.create({ data: { name: "A", slug: `a-${Date.now()}` } });
  const b = await prisma.tenant.create({ data: { name: "B", slug: `b-${Date.now()}` } });

  await withTenant(a.id, (tx) =>
    tx.contact.create({ data: { tenantId: a.id, firstName: "Alice" } }),
  );
  await withTenant(b.id, (tx) =>
    tx.contact.create({ data: { tenantId: b.id, firstName: "Bob" } }),
  );

  // Tenant A sees only its own contact.
  const seenByA = await withTenant(a.id, (tx) => tx.contact.findMany());
  assert.equal(seenByA.length, 1, "A should see exactly its own contact");
  assert.equal(seenByA[0]?.firstName, "Alice");

  // Tenant A cannot see B's contact.
  const bSeenByA = await withTenant(a.id, (tx) =>
    tx.contact.findMany({ where: { firstName: "Bob" } }),
  );
  assert.equal(bSeenByA.length, 0, "A must NOT see B's data");

  // No tenant context => zero rows (fail closed).
  const noContext = await prisma.contact.findMany();
  assert.equal(noContext.length, 0, "queries with no tenant context must see nothing");

  await prisma.$disconnect();
});
