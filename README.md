# Portfolio CMS

A clean full-stack foundation for a personal portfolio and private content-management dashboard. This milestone contains infrastructure only: no finished UI, authentication, or CRUD behavior.

## Stack

- React, TypeScript, Vite, Tailwind CSS, React Router
- Node.js, Express, TypeScript
- PostgreSQL, Prisma
- npm workspaces

## Structure

```text
.
├── apps/
│   ├── web/                       # Browser application
│   │   └── src/
│   │       ├── app/               # Router and application composition
│   │       ├── components/        # Reusable UI primitives (future)
│   │       ├── features/          # Feature-owned UI/state/API code (future)
│   │       ├── hooks/             # Shared React hooks
│   │       ├── layouts/           # Public and admin route shells
│   │       ├── lib/               # Shared infrastructure such as API config
│   │       ├── pages/              # Route-level public/admin pages
│   │       ├── styles/            # Tailwind entry point and theme
│   │       └── types/             # Shared frontend types
│   └── api/                       # Express API
│       ├── prisma/                # Prisma schema and future migrations
│       └── src/
│           ├── config/            # Validated environment configuration
│           ├── generated/         # Generated Prisma client (ignored)
│           ├── lib/               # Database/external infrastructure (future)
│           ├── middleware/        # Cross-cutting Express middleware
│           ├── modules/           # Domain modules and their HTTP boundaries
│           ├── routes/            # API router composition
│           └── types/             # Shared backend types
├── package.json                   # Workspace scripts
└── tsconfig.base.json             # Shared strict TypeScript rules
```

Future domains (`projects`, `skills`, `certificates`, `experience`, `profile`, and `auth`) should each live in their own module. This keeps routes/controllers, validation, services, and repositories grouped by business capability.

## Setup

Requirements: a current Node.js LTS release, npm, and PostgreSQL.

1. Install packages:

   ```bash
   npm install
   ```

2. Copy environment examples:

   ```bash
   cp apps/web/.env.example apps/web/.env
   cp apps/api/.env.example apps/api/.env
   ```

   On PowerShell, use `Copy-Item` instead of `cp` if preferred. Update `DATABASE_URL` for your PostgreSQL instance.

3. Generate the Prisma client:

   ```bash
   npm run prisma:generate
   ```

4. Start both applications:

   ```bash
   npm run dev
   ```

- Web: http://localhost:5173
- API health check: http://localhost:4000/api/health

The API can boot without a database connection at this stage. A reachable PostgreSQL instance will be required once migrations and data-backed features are added.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Run web and API development servers |
| `npm run dev:web` | Run only Vite |
| `npm run dev:api` | Run only Express |
| `npm run build` | Build all workspaces |
| `npm run typecheck` | Type-check all workspaces |
| `npm run lint` | Lint configured workspaces |
| `npm run prisma:generate` | Generate Prisma client |
| `npm run prisma:migrate` | Create/apply a development migration |

## Current routes

- `/` — public portfolio placeholder
- `/admin` — admin dashboard placeholder (not protected yet)
- `GET /api/health` — API readiness response

## Next milestones

Define the Prisma domain models and migrations, then add authentication/authorization, feature services and repositories, CRUD endpoints, and the portfolio/admin interfaces as separate milestones.
