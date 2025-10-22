# Code Glue - Project Context for AI Agents

## Project Overview
Code Glue is a Home Assistant addon that allows users to write automations and create entities in TypeScript. It consists of an Expo-based web client and a Node.js server.

## Architecture

### Monorepo Structure
- **Root**: Yarn workspace with `packageManager: "yarn@4.9.2"`
- **apps/client/**: Expo web app (React Native Web)
- **apps/server/**: Node.js/TypeScript server using Digital Alchemy libraries
- **packages/paradigm/**: Shared TypeScript package

### Build Outputs
- **Client**: `apps/client/dist/` - Static web export from Expo
- **Server**: `dist/server/` - Compiled TypeScript (`.mts` → `.mjs`)

### Runtime Structure in Container
```
/app/
├── server/
│   ├── dist/
│   │   └── client/          # Static web files served here
│   ├── app/
│   │   └── environments/
│   │       └── prebuilt/    # Production entry point
│   ├── migrations/          # Database migration files
│   │   ├── sqlite/
│   │   ├── mysql/
│   │   └── postgresql/
│   └── drizzle.config.ts
├── node_modules/
└── [other files]
```

## Key Technologies
- **Client**: Expo SDK 53, React 19, React Native Web, Metro bundler
- **Server**: Node.js 22, TypeScript 5.9, Fastify, Drizzle ORM, better-sqlite3
- **Framework**: Digital Alchemy (@digital-alchemy/core, @digital-alchemy/hass, @digital-alchemy/synapse)
- **Container**: Multi-stage Dockerfile using node:22-bookworm-slim

## Build Process

### Development Build
```bash
yarn build  # Builds both client (Expo) and server (TypeScript)
```

### Production Container Build (Prebuilt Approach)
The main `Dockerfile` uses a 3-stage build:

1. **deps stage**: Install all dependencies (including devDependencies for build)
2. **build stage**: Run `yarn build` to compile everything
3. **runner stage**: Copy built artifacts and production dependencies only

**Important**: Native modules (like `better-sqlite3`) are rebuilt in the runner stage for correct architecture.

## Database

### Schema & Migrations
- **ORM**: Drizzle ORM with better-sqlite3 driver
- **Migration files**: `apps/server/migrations/{sqlite,mysql,postgresql}/`
- **Config**: `apps/server/drizzle.config.ts`

### Migration Strategy
- **Development**: Run manually with `yarn server:db:migrate`
- **Production**: Automatic via `scripts/docker-entrypoint.sh` using `drizzle-kit migrate`
- **Important**: The server's `DatabaseInternalsService` also tries to run migrations but may fail if metadata is not in the expected location. Currently commented out to avoid bootstrap failures.

## Server Environments

The server has multiple entry points in `dist/server/app/environments/`:

- **local/** - Development with hot reload (`tsx`)
- **prod/** - Production with proxy setup (runs `start-with-proxy.mjs`)
- **prebuilt/** - Production for prebuilt containers (single process, serves static files)

### Prebuilt Environment
- Entry: `dist/server/app/environments/prebuilt/main.mjs`
- Sets `SERVE_STATIC=true` and `ATTACH_STANDARD_MIDDLEWARE=true`
- Expects client at `process.cwd() + '/server/dist/client'` → `/app/server/dist/client/`
- Runs on port 3789 (configurable via PORT env var)

## Static File Serving

The server's `StaticFileService` (`apps/server/src/http/services/static.service.mts`):
- Looks for client at `path.resolve(process.cwd(), "dist/client")` 
- With workdir `/app`, this resolves to `/app/dist/client`
- **Current setup**: Client copied to `/app/server/dist/client/` in Dockerfile
- Serves SPA with catch-all routing (all non-API routes → `index.html`)

## Container Startup Flow

1. **Entrypoint script** (`scripts/docker-entrypoint.sh`):
   - Runs database migrations: `cd /app/server && npx drizzle-kit migrate`
   - Sets `DATABASE_URL=file:/app/synapse_storage.db`
   - Starts server: `tsx /app/server/app/environments/prebuilt/main.mjs`

2. **Server bootstrap**:
   - Initializes Digital Alchemy services
   - Connects to Home Assistant (via HASS_TOKEN and HASS_BASE_URL)
   - Registers HTTP routes and static file handler
   - Starts listening on port 3789

## Home Assistant Integration

### Addon Configuration (`config.yaml`)
- **Type**: Local addon (builds from Dockerfile)
- **Ingress**: Enabled on port 3789
- **API Access**: Requires `homeassistant_api: true` and `hassio_api: true`
- **Architectures**: amd64, aarch64, armv7, i386, armhf

### Environment Variables (from Home Assistant)
- `SUPERVISOR_TOKEN` - Auto-injected by HA Supervisor
- `HASS_TOKEN` - Set via addon options or auto-configured
- `HASS_BASE_URL` - Set via addon options or auto-configured

## Common Issues & Solutions

### "no such table" Database Errors
- **Cause**: Migrations not running before service initialization
- **Fix**: Ensure `drizzle-kit migrate` runs in entrypoint script before server starts

### 404 Errors on Web UI
- **Cause**: Static files not at expected path
- **Fix**: Ensure client copied to `/app/server/dist/client/` in Dockerfile to match `StaticFileService` expectations

### "Can't find meta/_journal.json" Error
- **Cause**: `DatabaseInternalsService` tries to run migrations but looks in wrong location
- **Fix**: Set `SKIP_AUTO_MIGRATIONS=true` or comment out automatic migration code (since entrypoint handles it)

### Native Module Errors (better-sqlite3)
- **Cause**: Native modules built for wrong architecture
- **Fix**: Run `npm rebuild better-sqlite3` in runner stage after copying node_modules

### Build Cache Issues in Home Assistant
- **Symptom**: Changes not reflected after rebuild
- **Fix**: Bump `version` in `config.yaml` to force supervisor to rebuild

## Development Workflow

### Local Development
```bash
# Install dependencies
yarn install

# Run server in dev mode
yarn server:start  # Uses local environment with tsx

# Run client in dev mode  
yarn client:dev  # Expo dev server

# Build everything
yarn build

# Run database migrations
yarn server:db:migrate
```

### Testing Container Locally
```bash
# Build container
docker buildx build --load -t code-glue-addon:dev .

# Run container (will fail without HA connection)
docker run --rm -p 3789:3789 \
  -e HASS_TOKEN=test \
  -e HASS_BASE_URL=http://localhost:8123 \
  code-glue-addon:dev
```

### In Home Assistant Dev Container
The repo includes `.devcontainer/devcontainer.json` using `ghcr.io/home-assistant/devcontainer:2-addons`.
- Has Docker access built-in
- Can build and test addon directly in HA environment

## Important Paths Reference

| Description | Path in Container | Source in Build |
|-------------|------------------|-----------------|
| Server code | `/app/server/` | `dist/server/` |
| Client static files | `/app/server/dist/client/` | `apps/client/dist/` |
| Migrations | `/app/server/migrations/` | `apps/server/migrations/` |
| Database | `/app/synapse_storage.db` | Created at runtime |
| Node modules | `/app/node_modules/` | Copied from build stage |
| Entrypoint | `/docker-entrypoint.sh` | `scripts/docker-entrypoint.sh` |

## Testing Checklist

Before committing changes:
1. ✅ Container builds successfully
2. ✅ Database migrations run on startup
3. ✅ Server starts without errors (check for "bootstrap failed")
4. ✅ Static files accessible (no 404s on `/`)
5. ✅ API endpoints respond (check `/api/v1/health`)
6. ✅ No runtime building (no `yarn build` in logs)

## Future Improvements

### Planned (from TODO list)
- Multi-architecture CI/CD with GitHub Actions
- Publish to GitHub Container Registry (ghcr.io)
- Use pre-built images instead of building in Home Assistant

### Potential Optimizations
- Reduce image size by pruning dev dependencies more aggressively
- Use `yarn workspaces focus --production` for server-only deps
- Consider separate base images for different architectures
