<!-- ░░░ HERO ░░░ -->
<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:6d28d9,100:2563eb&height=200&section=header&text=Vast&fontSize=90&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=No%20limits%20to%20how%20you%20grow&descAlignY=58&descSize=18" alt="Vast" />

<p>
  <a href="https://github.com/LEXES7/VAST/actions/workflows/ci.yml"><img src="https://github.com/LEXES7/VAST/actions/workflows/ci.yml/badge.svg" alt="CI" /></a>
  <a href="https://github.com/LEXES7/VAST/actions/workflows/security.yml"><img src="https://github.com/LEXES7/VAST/actions/workflows/security.yml/badge.svg" alt="Security" /></a>
</p>

<p>
  <img src="https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-RLS-4169E1?logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/Supabase-Auth-3FCF8E?logo=supabase&logoColor=white" />
</p>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=20&duration=3500&pause=800&color=8B5CF6&center=true&vCenter=true&width=620&lines=A+modern%2C+unified+business+suite.;A+Zoho+alternative%2C+done+right.;Clean+UX.+One+data+model.+Secure+by+design." alt="Typing tagline" />

</div>

---

## 👋 What is Vast?

**Vast** is a modern, unified business suite — think of it as a Zoho alternative, but built to fix the things people actually complain about: clunky interfaces, data that feels siloed between apps, sluggish performance, and pricing you need a spreadsheet to understand.

We're starting where it matters most — a **CRM / Sales** app as the flagship — and growing the suite from there, all on top of one clean, shared foundation so everything feels like *one product*, not a bundle of bolted-together tools.

> [!NOTE]
> Vast is in active early development. The foundation — auth, multi-tenancy, security, and the first CRM slice — is in place and tested. Expect rapid iteration.

---

## ✨ Why we're building it this way

| What people dislike about big suites | How Vast answers it |
| --- | --- |
| Clunky, dated interfaces | A fast, modern UI (Next.js + Tailwind) |
| Apps that don't talk to each other | One unified data model across the suite |
| "Customizable" but rigid | A modular architecture designed to extend |
| Security as an afterthought | Security by design — isolation enforced in the database |
| Confusing pricing | A clear, simple model (as we grow) |

---

## 🏗️ Architecture

Vast runs as a **modular monolith** — one app that's cheap and fast to run, but split internally into strict modules with clean boundaries. Any module can later graduate into its own service when scale genuinely demands it. It's the same path companies like Shopify and GitHub took, and it keeps a small team shipping features instead of fighting infrastructure.

```mermaid
flowchart TB
    User([👤 User / Browser])

    subgraph Frontend["🖥️  Frontend — Next.js on Vercel"]
        UI["React · Tailwind · shadcn/ui"]
        MW["Session Middleware<br/>(refreshes Supabase session)"]
    end

    subgraph API["⚙️  Backend — NestJS Modular Monolith"]
        Guard["🛡️ Auth Guard<br/>(deny-by-default)"]
        RBAC["RBAC + Tenant Resolver"]
        subgraph Modules["Modules"]
            direction LR
            Auth["Auth"]
            CRM["CRM"]
            Onboard["Onboarding"]
            Health["Health"]
        end
    end

    subgraph Data["🗄️  Data Layer"]
        PG[("PostgreSQL<br/>Row-Level Security")]
        Redis[("Redis<br/>background jobs")]
    end

    SB{{"🔐 Supabase Auth<br/>(JWKS — public keys)"}}

    User --> UI --> MW
    MW -->|"Bearer JWT"| Guard
    Guard -->|"verify signature"| SB
    Guard --> RBAC --> Modules
    Modules -->|"tenant-scoped queries"| PG
    Modules --> Redis
```

### How a request authenticates

```mermaid
sequenceDiagram
    actor U as User
    participant W as Next.js
    participant S as Supabase Auth
    participant A as Vast API
    participant D as PostgreSQL (RLS)

    U->>W: Sign in
    W->>S: signInWithPassword
    S-->>W: session (JWT)
    W->>A: GET /api/me  (Authorization: Bearer JWT)
    A->>S: verify JWT against public JWKS
    A->>D: resolve tenant + role (membership)
    D-->>A: tenant, role
    A-->>W: { tenant, role }
    W-->>U: Dashboard
```

---

## 🧰 Tech stack

| Layer | Choice |
| --- | --- |
| **Frontend** | Next.js 15, React 19, TypeScript, Tailwind, shadcn/ui |
| **Backend** | NestJS 11 (modular monolith) |
| **Database** | PostgreSQL with Row-Level Security (via Supabase) |
| **ORM** | Prisma 6 |
| **Auth** | Supabase Auth (JWTs verified against public JWKS) |
| **Jobs / cache** | Redis + BullMQ |
| **Monorepo** | pnpm workspaces + Turborepo |
| **CI/CD** | GitHub Actions (build, tenant-isolation test, dependency audit, secret scan, CodeQL) |

---

## 📁 Project structure

```text
vast/
├── apps/
│   ├── web/                # Next.js frontend (UI, auth, dashboard)
│   └── api/                # NestJS modular monolith
│       └── src/
│           ├── auth/       # JWT verification, guards, RBAC, tenant resolver
│           ├── crm/        # Contacts (flagship module)
│           ├── account/    # Onboarding + /me
│           └── health/     # Health check
├── packages/
│   ├── db/                 # Prisma schema, migrations, RLS policies
│   ├── shared/             # Shared types + Zod schemas
│   └── config/             # Shared tsconfig presets
├── .github/workflows/      # CI + security pipelines
└── docker-compose.yml      # Local Postgres + Redis
```

---

## 🚀 Getting started — A to Z

Everything you need to run Vast locally, start to finish.

### Prerequisites

- **Node.js** ≥ 20
- **pnpm** 10 (`npm install -g pnpm`)
- A **Supabase** project (free tier) — for auth and the Postgres database
- *(optional)* **Docker** — if you'd rather run Postgres + Redis locally instead of Supabase

### 1. Clone

```bash
git clone https://github.com/LEXES7/VAST.git
cd VAST
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

> [!IMPORTANT]
> Every `.env` file below is **git-ignored on purpose**. Never commit real secrets.
> The values shown are **placeholders** — replace them with your own from the Supabase dashboard.

**`apps/web/.env.local`** — the frontend (these are browser-safe public values):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
NEXT_PUBLIC_API_URL=http://localhost:4000
```

**`apps/api/.env`** — the API:

```bash
SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
DATABASE_URL=postgresql://vast_app:YOUR_APP_ROLE_PASSWORD@db.YOUR-PROJECT-REF.supabase.co:5432/postgres
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

**`packages/db/.env`** — database tooling (migrations vs. runtime):

```bash
# Runtime: a RESTRICTED role (Row-Level Security is enforced on it)
DATABASE_URL=postgresql://vast_app:YOUR_APP_ROLE_PASSWORD@db.YOUR-PROJECT-REF.supabase.co:5432/postgres
# Admin: used ONLY for migrations
DIRECT_URL=postgresql://postgres:YOUR_DB_PASSWORD@db.YOUR-PROJECT-REF.supabase.co:5432/postgres
```

> Where to find these: Supabase → **Project Settings → API** (URL + publishable key) and **Project Settings → Database** (connection string + password).
> URL-encode special characters in passwords (`@` → `%40`).

### 4. Set up the database

Run the migrations (creates all tables) and apply the security policies:

```bash
pnpm --filter @vast/db generate        # generate the Prisma client
pnpm --filter @vast/db run migrate:deploy   # create tables
pnpm --filter @vast/db run apply-rls        # enable Row-Level Security
```

**Create the restricted application role.** This is the role the app connects as, and it's what makes tenant isolation actually enforced (admin roles bypass RLS by design). In the Supabase **SQL Editor**, run:

```sql
CREATE ROLE vast_app LOGIN PASSWORD 'choose-a-strong-password';

GRANT USAGE ON SCHEMA public TO vast_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO vast_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO vast_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO vast_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT USAGE, SELECT ON SEQUENCES TO vast_app;
```

Then put that password into the `DATABASE_URL` lines in `apps/api/.env` and `packages/db/.env`.

> [!TIP]
> Prefer to run locally without Supabase's database? Start Postgres + Redis with `docker compose up -d` and point your `DATABASE_URL` / `DIRECT_URL` at `localhost:5432`.

### 5. Run it

```bash
pnpm dev
```

- **Web** → http://localhost:3000
- **API** → http://localhost:4000 (health check at `/api/health`)

### 6. Try the full flow

1. Open the web app and **sign up** (in Supabase, make sure email confirmation is either disabled for dev or confirm the user).
2. You'll land on the dashboard, which sends you to **onboarding** since you have no organization yet.
3. **Create your organization** — you become its owner.
4. Back on the dashboard, **add a contact**. It's saved scoped to your tenant, with Row-Level Security enforcing isolation at the database.

---

## 🔐 Security

Security isn't a feature we added later — it's baked into the foundation.

- **Tenant isolation at the database.** Multi-tenant separation is enforced by PostgreSQL Row-Level Security, not just application code. The app connects as a restricted role, so a bug in app logic can't leak one customer's data to another. This is verified automatically in CI on every push.
- **Deny-by-default.** Every API route requires a verified session unless explicitly marked public.
- **Trusted auth.** Logins are handled by Supabase; the API verifies every token's signature against Supabase's public keys.
- **Role-based access control.** Permissions are checked on the server, scoped per tenant.
- **Validated input** at every boundary, **parameterized queries** everywhere, **secrets** kept out of the repo, and **continuous scanning** (dependency audit, secret scanning, and CodeQL) in CI.

---

## 📜 Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Run web + API in watch mode |
| `pnpm build` | Build everything |
| `pnpm typecheck` | Type-check all packages |
| `pnpm lint` | Lint all packages |
| `pnpm --filter @vast/db run migrate:deploy` | Apply database migrations |
| `pnpm --filter @vast/db run apply-rls` | Apply Row-Level Security policies |
| `pnpm --filter @vast/db run test:isolation` | Prove tenant isolation against a database |

---

## 🗺️ Roadmap

- [x] Monorepo foundation, CI/CD, security pipeline
- [x] Multi-tenancy with Row-Level Security (proven in CI)
- [x] Authentication (Supabase) + RBAC + onboarding
- [x] CRM — Contacts
- [ ] CRM — Companies, Deals & pipeline (Kanban)
- [ ] Activities & unified timeline
- [ ] Team members & invitations
- [ ] More apps in the suite

---

<div align="center">

**Vast** — *no limits to how you grow.*

<sub>© 2026 Vast. All rights reserved.</sub>

</div>
