# Vast

A modern, unified business suite. No limits.

Vast is a Zoho alternative built to fix what people dislike about big suites:
clunky UX, fragmented data between apps, slow performance, and confusing pricing.
The flagship app is **CRM / Sales**; the suite grows from there.

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the full design.

## Stack

- **Frontend:** Next.js + TypeScript + Tailwind + shadcn/ui
- **Backend:** NestJS modular monolith
- **Database:** PostgreSQL (Supabase), multi-tenant via Row-Level Security
- **Jobs:** BullMQ + Redis
- **Monorepo:** pnpm workspaces + Turborepo

## Layout

```
apps/
  web/      Next.js frontend
  api/      NestJS modular monolith
packages/
  db/       Prisma schema + client
  shared/   shared types + Zod schemas
  config/   shared tsconfig presets
```

## Getting started

```bash
# 1. install deps
pnpm install

# 2. start local Postgres + Redis
docker compose up -d

# 3. set up env
cp .env.example .env

# 4. run everything
pnpm dev
```

- Web: http://localhost:3000
- API: http://localhost:4000  (health check at `/api/health`)

## Scripts

| Command          | What it does                     |
|------------------|----------------------------------|
| `pnpm dev`       | Run web + api in dev             |
| `pnpm build`     | Build all packages               |
| `pnpm lint`      | Lint all packages                |
| `pnpm typecheck` | Typecheck all packages           |
