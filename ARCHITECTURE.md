# Vast — Architecture

> A modern, unified business suite. Flagship app: **CRM / Sales**.
> Positioning: a Zoho alternative that fixes the things people complain about —
> clunky UX, fragmented data between apps, slow performance, and confusing pricing.

**Status:** Foundation design (pre-code)
**Last updated:** 2026-06-15

---

## 1. Guiding principles

1. **Modular monolith first, microservices later.** One deployable app split into
   strict internal modules. Carve modules into services only when scale demands it.
2. **Unified data model.** All modules share one well-designed schema so the suite
   feels like one product, not bolted-together apps. (This is Zoho's biggest weakness.)
3. **Security by design.** Tenant isolation, least privilege, and secret hygiene are
   established before any feature code — never bolted on.
4. **Type safety end to end.** TypeScript everywhere; schemas validate every boundary.
5. **Free-tier native.** Every component has a real free tier so we can ship at $0.
6. **Boring, proven tech.** We optimize for shipping features, not for novelty.

---

## 2. High-level topology

```
                    ┌──────────────────────────┐
   Browser  ───────▶│  Next.js (Vercel)        │   Frontend: UI + BFF
                    │  React, TS, Tailwind,     │
                    │  shadcn/ui                │
                    └────────────┬─────────────┘
                                 │ tRPC (typed)  /  REST (public API)
                                 ▼
                    ┌──────────────────────────┐
                    │  NestJS Modular Monolith  │   Backend (Railway/Fly.io)
                    │  ┌──────────────────────┐ │
                    │  │ Auth  CRM  Billing   │ │   strict module boundaries
                    │  │ Notifications  Audit │ │   no cross-module DB access
                    │  └──────────────────────┘ │
                    └───┬───────────┬───────────┘
                        │           │
              ┌─────────▼──┐   ┌────▼─────────┐
              │ PostgreSQL │   │ Redis        │
              │ (Supabase) │   │ (Upstash)    │
              │ + RLS      │   │ BullMQ jobs  │
              └────────────┘   └──────────────┘
                        │
              ┌─────────▼──────────┐
              │ Supabase Auth,     │
              │ Storage, Realtime  │
              └────────────────────┘
```

---

## 3. Stack

| Layer            | Choice                                   | Rationale |
|------------------|------------------------------------------|-----------|
| Frontend         | Next.js + TypeScript, Tailwind, shadcn/ui| Industry default; great UX, fixes Zoho's clunkiness |
| Backend          | NestJS (modular monolith)                | Enforces clean modules + dependency injection |
| Internal API     | tRPC                                     | End-to-end type safety, no codegen |
| Public API       | REST + OpenAPI                           | Documented, stable surface for integrations |
| Database         | PostgreSQL via Supabase                  | Solid; bundles auth, storage, realtime free |
| ORM              | Prisma (or Drizzle)                      | Type-safe queries, migrations |
| Multi-tenancy    | Shared DB + Row-Level Security           | Strong isolation, no per-tenant infra cost |
| Auth / Identity  | Supabase Auth (Clerk as alt)             | MFA, SSO-ready, RBAC; never hand-rolled |
| Background jobs  | BullMQ + Redis (Upstash)                 | Async emails, reports, syncs |
| Hosting          | Vercel + Railway/Fly.io + Supabase       | All real free tiers |
| Observability    | Sentry + structured logs                 | Errors and traces from day one |
| CI/CD            | GitHub Actions                           | Lint, test, typecheck, deploy |

---

## 4. Multi-tenancy

- **Model:** shared database, shared schema, `tenant_id` (org id) on every tenant-scoped row.
- **Enforcement:** PostgreSQL **Row-Level Security** policies keyed on the current tenant —
  isolation lives in the database, so an app-code bug cannot leak one customer's data to another.
- **Tenant context:** resolved from the authenticated session on every request and set as a
  Postgres session variable that RLS policies read.
- **Migration path:** if a large customer ever needs hard isolation, the same schema supports
  promoting them to a dedicated database without app rewrites.

---

## 5. Module boundaries (modular monolith)

Each module owns its tables, services, and API. **No module reads another module's tables
directly** — they talk through service interfaces / domain events. This is what keeps the
"split into microservices later" option open.

Initial modules:
- **`auth`** — identity, sessions, RBAC, tenant membership
- **`crm`** — contacts, companies, deals, pipeline, activities *(flagship — built first)*
- **`billing`** — subscriptions, plan limits, usage *(stubbed early, real later)*
- **`notifications`** — email/in-app, async via queue
- **`audit`** — immutable log of sensitive actions
- **`platform`** — shared kernel: tenancy, common types, errors, validation

---

## 6. Security (OWASP-aligned)

| Area              | Control |
|-------------------|---------|
| Tenant isolation  | Postgres RLS on every tenant-scoped table (primary defense) |
| Authentication    | Managed provider, MFA available, secure session handling |
| Authorization     | RBAC, least privilege, scoped per tenant |
| Input validation  | Zod schemas at every API boundary; parameterized queries only |
| Secrets           | Env/secret manager; `.env` git-ignored from commit #1; no secrets in code |
| Transport/at-rest | TLS in transit; encryption at rest (Postgres/Supabase) |
| Auditing          | Immutable audit log for sensitive actions |
| Dependencies      | Dependabot + scheduled `audit`; security-review step in workflow |
| Headers/CSRF      | Secure headers, CSRF protection, rate limiting on auth + public API |

Every feature is checked against the **OWASP Top 10** before merge.

---

## 7. CRM (first module) — initial scope

Domain entities: **Contact, Company, Deal, Pipeline/Stage, Activity (note/call/task), User, Tenant.**

MVP slices, in order:
1. Auth + tenant onboarding (sign up → create org → invite users)
2. Contacts & companies (CRUD, search, custom fields-ready schema)
3. Deals + pipeline (Kanban board, drag between stages)
4. Activities & timeline (unified history per contact/deal)
5. Dashboard (pipeline value, recent activity)

Detailed entity schema lands in `docs/crm-data-model.md` when we start this module.

---

## 8. Environments & deployment

- **Local:** Docker Compose (Postgres + Redis) + app dev servers.
- **Staging / Prod:** Vercel (frontend), Railway or Fly.io (backend), Supabase (data/auth).
- **CI/CD:** GitHub Actions — lint, typecheck, test, then deploy on main.

---

## 9. Proposed repo layout (monorepo)

```
vast/
├── apps/
│   ├── web/            # Next.js frontend
│   └── api/            # NestJS modular monolith
├── packages/
│   ├── db/             # Prisma schema, migrations, RLS policies
│   ├── shared/         # shared types, Zod schemas, utils
│   └── config/         # eslint/tsconfig/tailwind presets
├── docs/
│   └── crm-data-model.md
├── docker-compose.yml
├── ARCHITECTURE.md
└── README.md
```

Tooling: **pnpm + Turborepo** for the monorepo.

---

## 10. Open decisions (revisit later)

- Prisma vs Drizzle ORM (defaulting to Prisma for DX)
- Supabase Auth vs Clerk (defaulting to Supabase for the bundled free tier)
- When to introduce a public API + webhooks (after CRM MVP)
