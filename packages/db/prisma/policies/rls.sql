-- Vast — Row-Level Security policies.
-- Run AFTER `prisma migrate` has created the tables:
--   pnpm --filter @vast/db apply-rls
--
-- How it works:
--   * Every request runs inside a transaction that sets `app.tenant_id` to the
--     tenant from the VERIFIED session (see packages/db/src/tenant.ts).
--   * Each policy restricts rows to that tenant.
--   * FORCE ROW LEVEL SECURITY makes the policies apply even to the table owner
--     (Prisma connects as the owner), so there is no bypass.
--   * current_setting(..., true) returns NULL when unset, so a query with no
--     tenant context sees ZERO rows — fail closed, never fail open.

-- Helper: the current tenant for this transaction (NULL if unset).
CREATE OR REPLACE FUNCTION app_current_tenant() RETURNS uuid
  LANGUAGE sql STABLE AS $$
  SELECT NULLIF(current_setting('app.tenant_id', true), '')::uuid
$$;

-- tenants: a row is visible only to its own tenant context.
ALTER TABLE "tenants" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "tenants" FORCE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS tenant_isolation ON "tenants";
CREATE POLICY tenant_isolation ON "tenants"
  USING ("id" = app_current_tenant())
  WITH CHECK ("id" = app_current_tenant());

-- Generic tenant-scoped tables (all keyed on "tenantId").
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['memberships','companies','contacts','deals','audit_logs']
  LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY;', t);
    EXECUTE format('ALTER TABLE %I FORCE ROW LEVEL SECURITY;', t);
    EXECUTE format('DROP POLICY IF EXISTS tenant_isolation ON %I;', t);
    EXECUTE format(
      'CREATE POLICY tenant_isolation ON %I USING ("tenantId" = app_current_tenant()) WITH CHECK ("tenantId" = app_current_tenant());',
      t
    );
  END LOOP;
END $$;

-- audit_logs is append-only: block UPDATE and DELETE for everyone via policy.
DROP POLICY IF EXISTS audit_no_update ON "audit_logs";
CREATE POLICY audit_no_update ON "audit_logs" FOR UPDATE USING (false);
DROP POLICY IF EXISTS audit_no_delete ON "audit_logs";
CREATE POLICY audit_no_delete ON "audit_logs" FOR DELETE USING (false);
