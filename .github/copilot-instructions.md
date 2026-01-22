# Copilot Instructions for Ordre du Wololo

## Project Overview

This is an **NX monorepo** for the "Ordre du Wololo" project - an Age of Empires 4 clan management application. It tracks clan members ([ODW] tag) from the aoe4world API, stores player stats, and displays leaderboards.

## Tech Stack

### Backend (`apps/backend/`)
- **Framework**: NestJS 11
- **Database**: PostgreSQL (remote VPS: 51.91.110.165:5432, database: `odw`)
- **ORM**: TypeORM with `autoLoadEntities: true`
- **Scheduling**: `@nestjs/schedule` for cron jobs
- **Environment**: dotenv with `.env.local` file

### Frontend (`apps/frontend/`)
- **Framework**: React 19 with TypeScript
- **Build**: Vite
- **Styling**: CSS Modules

### Shared (`libs/`)
- `shared-types`: Shared TypeScript interfaces (for frontend use)
- `wololo-challenge`: Reusable React components

## Project Structure

```
apps/backend/src/
├── main.ts                    # Bootstrap with dotenv BEFORE imports
├── app/                       # Root module, controller, service
├── common/                    # Shared utilities (guards, filters, pipes, decorators, interceptors)
├── config/                    # Configuration files
├── player/                    # Player feature module
│   ├── index.ts              # Barrel export
│   ├── player.module.ts
│   ├── player.controller.ts
│   ├── player.service.ts
│   └── entities/
│       ├── index.ts
│       └── player.entity.ts
└── scheduler/                 # Scheduled tasks
    ├── index.ts
    ├── scheduler.module.ts
    └── player-sync.scheduler.ts
```

## Coding Conventions

### NestJS Backend

1. **Entities**: 
   - Place in `<module>/entities/` folder
   - Use snake_case for database columns: `@Column({ name: 'profile_id' })`
   - Use camelCase for TypeScript properties
   - No `!` assertions - `strictPropertyInitialization: false` is set in tsconfig

2. **Module Structure**:
   - Each feature in its own folder directly under `src/` (no `modules/` wrapper)
   - Barrel exports via `index.ts` files
   - Export: module, service, controller, entities

3. **Imports**:
   - Use barrel imports: `import { PlayerModule } from '../player'`
   - Don't import from `@ordreduwololo/shared-types` in backend (webpack rootDir issue)
   - Define interfaces locally in backend services

4. **Environment Variables**:
   - Load dotenv BEFORE module imports in `main.ts`
   - Use `.env.local` for local development
   - Required: `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE`

5. **Scheduling**:
   - Import `ScheduleModule.forRoot()` in `app.module.ts`
   - Use `@Cron()` decorator for recurring tasks
   - Use `@Timeout()` for startup tasks

### TypeORM

1. **Primary Keys**: Use `@PrimaryColumn()` for external IDs (e.g., `profile_id` from API)
2. **Timestamps**: Use `@CreateDateColumn()` and `@UpdateDateColumn()`
3. **Nullable fields**: Mark as `nullable: true` in decorator AND `| null` in type
4. **Sync**: `synchronize: true` for development only

### API Patterns

1. **External API**: aoe4world API at `https://aoe4world.com/api/v0`
2. **Player search**: `/players/search?query=[ODW]` (paginated, 50 per page)
3. **Rate limiting**: Add 200ms delay between paginated requests
4. **Sync logic**: Check if player exists, compare fields, update only if changed

## Common Commands

```bash
# Build backend
npx nx build backend

# Serve backend (development)
npx nx serve backend

# Run backend directly
cd apps/backend && node dist/main.js

# Run tests
npx nx test backend
```

## Database Schema

### Players Table
- `profile_id` (PK) - from aoe4world API
- `name`, `steam_id`, `country`
- `avatar_small`, `avatar_medium`, `avatar_full`
- `twitch_url`, `youtube_url`
- `last_game_at`
- `rm_solo_*` - Ranked Match Solo stats (rating, rank, rank_level, games_count, wins_count, losses_count, win_rate)
- `rm_team_*` - Ranked Match Team stats (same fields)
- `created_at`, `updated_at`

## Key Decisions

1. **No DTOs for now** - Entity returned directly, sync data comes from external API
2. **Flat structure** - Features directly in `src/`, no `modules/` folder
3. **Local interfaces** - Backend defines its own types, shared-types for frontend only
4. **Hourly sync** - Players synced via cron job + on startup (10s delay)

## Gotchas

1. **dotenv timing**: Must call `dotenv.config()` BEFORE importing AppModule in main.ts
2. **TypeORM strict mode**: `strictPropertyInitialization: false` required in tsconfig
3. **baseUrl required**: Both `tsconfig.base.json` and `tsconfig.app.json` need `baseUrl: "."`
4. **PostgreSQL remote**: Ensure `listen_addresses = '*'` and proper pg_hba.conf rules on VPS
