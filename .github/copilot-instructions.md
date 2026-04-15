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
