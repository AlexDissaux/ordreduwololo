# Copilot Instructions

## Monorepo Architecture

This project is an **Nx monorepo** using npm workspaces (`"workspaces": ["apps/*", "libs/*"]`).
All packages share the npm scope `@ordreduwololo-nx`.

### Apps (`apps/`)

| Package | Description |
|---|---|
| `@ordreduwololo-nx/frontend` | React + Vite SPA — main user-facing app |
| `@ordreduwololo-nx/backend` | NestJS API server |
| `@ordreduwololo-nx/frontend-e2e` | Playwright end-to-end tests for frontend |
| `@ordreduwololo-nx/backend-e2e` | End-to-end tests for backend |

### Libraries (`libs/`)

| Package | Description |
|---|---|
| `@ordreduwololo-nx/shared-types` | Pure TypeScript interfaces and types shared across all apps and libs (no runtime code) |
| `@ordreduwololo-nx/ui` | Generic reusable UI components (React). See details below. |
| `@ordreduwololo-nx/wololo-challenge` | Future standalone app / lib for the Wololo Challenge feature — **do not add general-purpose components here** |

---

## `@ordreduwololo-nx/ui` — Shared UI Library

**Location:** `libs/ui/`  
**Purpose:** Reusable React components and assets shared by any current or future app in the monorepo.

### What belongs here
- Display components that are not tied to a specific feature or domain
- Shared assets (icons, images) consumed by those components

### What does NOT belong here
- Feature-specific logic or data fetching
- Domain types (use `shared-types` for that)

### Current exports
- `RankIcon` — renders the AoE4 rank icon SVG for a given `rm_solo_rank_level` string (e.g. `"diamond_2"`, `"conqueror_3"`). Assets live in `libs/ui/src/assets/rank_icon/` as `solo_<rank>_<level>.svg`.

### Usage
```tsx
import { RankIcon } from '@ordreduwololo-nx/ui';

<RankIcon rankLevel={player.rm_solo_rank_level} size={28} />
```

---

## Key conventions

- **Types first:** define or reuse types from `@ordreduwololo-nx/shared-types` before writing component props.
- **Workspace resolution:** the monorepo uses `"@ordreduwololo-nx/source"` as a custom condition so Vite resolves libs directly from `src/` in dev without a build step.
- **Nx** is used for task orchestration (`nx serve`, `nx build`, `nx test`, etc.). Use `nx affected` when possible to only run tasks impacted by a change.

---

## Backend separation of responsibilities (NestJS)

Each feature module must split responsibilities across dedicated files:

| File | Responsibility |
|---|---|
| `<feature>.controller.ts` | HTTP routing, request/response handling only |
| `<feature>.service.ts` | Business logic and orchestration only |
| `<feature>.repository.ts` | All TypeORM data access (`find*`, `upsert`, etc.) |
| `<feature>.mapper.ts` | Mapping between API/external shapes and DB entities (plain functions, no `@Injectable`) |
| `<feature>-api.service.ts` | External HTTP API calls only (no DB access, no mapping to entity) |

### Rules
- **Services** must not inject TypeORM `Repository<T>` directly — use the feature's `<feature>.repository.ts` instead.
- **Mappers** are plain functions (not injectable classes), imported directly where needed.
- **API services** must not contain entity mapping logic — that belongs in the mapper.
- **Repositories** are `@Injectable()` classes registered in the module's `providers` array.
# aoe4.fr – Copilot Instructions

## Project Overview

**aoe4.fr** is a French-speaking Age of Empires IV community platform. It displays ranked leaderboards, live current games, and hosts the "Wololo Challenge" team tournament event. Data is pulled from the public [aoe4world.com](https://aoe4world.com/api/v0) API.

## Monorepo Structure (Nx)

```
apps/
  backend/          NestJS API (Node.js, TypeORM, PostgreSQL)
  backend-e2e/      Backend E2E tests
  frontend/         React + Vite + Tailwind CSS v4
  frontend-e2e/     Playwright E2E tests
libs/
  shared-types/     Shared TypeScript interfaces (IPlayer, ICurrentGame, …)
  wololo-challenge/ Self-contained React lib for the ODW tournament event
```

## Tech Stack

| Layer | Technology |
|---|---|
| Monorepo | Nx 22 |
| Backend | NestJS 11, TypeORM, PostgreSQL, `@nestjs/schedule` (cron jobs) |
| Frontend | React 19, React Router v6, Vite, Tailwind CSS v4 |
| Shared types | TypeScript interfaces in `libs/shared-types` |
| Testing | Jest (unit), Playwright (e2e), `@testing-library/react` |
| Language | TypeScript throughout |

## Backend Conventions

- **Module structure**: each feature has its own NestJS module folder (`player/`, `leaderboard/`, `current-games/`) with `module.ts`, `controller.ts`, `service.ts`, and an `index.ts` barrel.
- **TypeORM entities**: stored in `entities/` subfolder. Column names use `snake_case` DB names mapped to `camelCase` TS properties via the `name` option.
- **DTOs**: used for API responses, defined with `class-validator`/`class-transformer`.
- **External API calls**: use plain `fetch` or `axios`, wrapped in dedicated `*.api.ts` files (not services).
- **Caching**: in-memory cache services (e.g. `LeaderboardCacheService`) for frequently read data.
- **Schedulers**: cron jobs use `@nestjs/schedule` `@Cron` decorator, implement `OnApplicationBootstrap` when startup sync is needed.
- **SSE streaming**: `@Sse` + RxJS `BehaviorSubject` / `Observable` pattern (see `CurrentGamesController`).
- **Environment config**: env vars read directly from `process.env` in `app.module.ts`; no ConfigModule abstraction currently.
- **Logger**: use `new Logger(ClassName.name)` from `@nestjs/common`.
- **Rate limiting**: add `delay()` between external API batches to avoid hitting aoe4world rate limits.

## Frontend Conventions

- **Feature folders** under `apps/frontend/src/app/` contain the component, a custom hook (`use*.ts`), an API file (`*.api.ts`), CSS module (`*.module.css`), and an `index.ts` barrel.
- **Data fetching**: custom hooks using `fetch`/`EventSource` — no React Query or SWR.
- **Styling**: Tailwind CSS v4 utility classes + CSS Modules for component-specific styles. No CSS-in-JS.
- **Routing**: React Router v6 `<Routes>/<Route>`. The `/event/*` route renders the `WololoChallengeApp` from the lib.
- **Shared types**: import from `@ordreduwololo-nx/shared-types` (path alias defined in `tsconfig.base.json`).
- **Component granularity**: small presentational components, co-located with feature folder.

## Wololo Challenge Lib (`libs/wololo-challenge`)

- Self-contained React app/library for the ODW tournament.
- Static team/player data lives in `src/db/data.ts` (`teamsNameAndId`, `sinceDate`, `endDate`).
- API calls to aoe4world are made client-side from `src/api/`.
- Components: `Stat/`, `BelgianLeaderboard`, `Countdown`, `LastChancePopup`, `Podium`, `Titre`.

## Shared Types (`libs/shared-types`)

- Pure TypeScript interfaces: `IPlayer`, `IRankedStats`, `IPlayerAvatars`, `IPlayerSocial`, `ICurrentGame`, `ICurrentGamePlayer`.
- Imported on both frontend and backend via the `@ordreduwololo-nx/shared-types` alias.
- Never add runtime logic here — interfaces only.

## Key Domain Concepts

- **French-speaking countries** (`FRENCH_SPEAKING_COUNTRIES`): the set of country codes used to filter aoe4world leaderboard data.
- **Leaderboards tracked**: `rm_solo` and `rm_team` (Ranked Match Solo and Team).
- **Player sync**: hourly cron pulls all French-speaking players from aoe4world API and upserts into PostgreSQL.
- **Current games**: polls active players' ongoing games from aoe4world, streamed to client via SSE.
- **Leaderboard**: served from in-memory cache, refreshed after each player sync.

## Common Commands

```bash
# Serve backend with HMR
npm run serve:back:dev

# Serve frontend
npm run serve:front

# Run all tests
nx test

# Lint
nx lint

# Build & deploy frontend (gh-pages)
npm run deploy
```

## What to Avoid

- Do not use `synchronize: true` in TypeORM for production — it's only acceptable for initial dev setup.
- Do not call `process.env` outside of `app.module.ts` or dedicated config files.
- Do not add runtime code to `libs/shared-types` — interfaces only.
