# syntax=docker/dockerfile:1.7
FROM node:22-bookworm-slim AS deps

ENV CI=1
ENV EXPO_NO_TELEMETRY=1

# Install system dependencies needed for building native modules
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ git ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /work

# Use Corepack to respect repo's declared Yarn version (packageManager field)
RUN corepack enable

# Copy package files for better Docker layer caching
COPY package.json yarn.lock ./
COPY apps/client/package.json apps/client/package.json  
COPY apps/server/package.json apps/server/package.json
COPY packages/paradigm/package.json packages/paradigm/package.json

# Copy Yarn configuration for Yarn Berry
COPY .yarnrc.yml ./
COPY .yarn .yarn

# Install all dependencies (including dev deps needed for build)
# Configure yarn to handle platform differences and checksum issues
RUN yarn config set checksumBehavior update
RUN yarn config set enableImmutableInstalls false
RUN yarn install

FROM deps AS build

# Copy the rest of the source code
COPY . .

# Build both client and server using the root build script
RUN yarn build

# Verify build artifacts exist
RUN test -d apps/client/dist && echo "✅ Client build found"
RUN test -d dist/server && echo "✅ Server build found"
RUN test -f dist/server/app/environments/prebuilt/main.mjs && echo "✅ Prebuilt environment found"

FROM node:22-bookworm-slim AS runner

ENV NODE_ENV=production
ENV PORT=3789
ENV SERVE_STATIC=true
ENV ATTACH_STANDARD_MIDDLEWARE=true

WORKDIR /app

# Use existing node user or create if needed
RUN id -u node || useradd --system --create-home --uid 1001 nodeuser

# Enable corepack for tsx
RUN corepack enable

# Install tsx globally for runtime
RUN npm install -g tsx

# Copy built server
COPY --from=build /work/dist/server ./server
COPY --from=build /work/apps/server/package.json ./apps/server/package.json
COPY --from=build /work/apps/server/migrations ./server/migrations
COPY --from=build /work/apps/server/drizzle.config.ts ./server/drizzle.config.ts

# Copy built client to the path the server expects (dist/client relative to workdir)
COPY --from=build /work/apps/client/dist ./dist/client

# Copy entrypoint script
COPY scripts/docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Copy workspace files needed for production dependencies
COPY --from=build /work/package.json ./package.json
COPY --from=build /work/yarn.lock ./yarn.lock
COPY --from=build /work/.yarnrc.yml ./.yarnrc.yml 
COPY --from=build /work/.yarn ./.yarn

# Install production dependencies - copy node_modules from build stage
COPY --from=build /work/node_modules ./node_modules

# Rebuild native modules for the runner architecture
RUN npm rebuild better-sqlite3

# Change ownership to node user
RUN chown -R node:node /app

USER node

EXPOSE 3789

# Use entrypoint script to run migrations then start server
CMD ["/docker-entrypoint.sh"]
