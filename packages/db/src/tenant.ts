import { prisma } from "./index";

/**
 * Run a database operation scoped to a single tenant.
 *
 * Opens a transaction, sets `app.tenant_id` for its lifetime (SET LOCAL is
 * transaction-scoped, so it can't leak to another request on a pooled
 * connection), and runs the callback. RLS policies then restrict every query
 * inside to that tenant. If no tenant is set, RLS returns zero rows — fail closed.
 *
 * The tenantId MUST come from the verified session, never from client input.
 */
export function withTenant<T>(
  tenantId: string,
  fn: (tx: Parameters<Parameters<typeof prisma.$transaction>[0]>[0]) => Promise<T>,
): Promise<T> {
  return prisma.$transaction(async (tx) => {
    // Parameterized to avoid any injection via the tenant id.
    await tx.$executeRaw`SELECT set_config('app.tenant_id', ${tenantId}, true)`;
    return fn(tx);
  });
}
