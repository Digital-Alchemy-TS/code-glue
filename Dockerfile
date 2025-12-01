# syntax=docker/dockerfile:1.7
FROM node:22-bookworm-slim

ENV CI=1
ENV EXPO_NO_TELEMETRY=1
ENV PORT=3789
# Don't set NODE_ENV=production yet - we need devDependencies for build

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
# Explicitly unset NODE_ENV to ensure devDependencies are installed (v2)
RUN unset NODE_ENV && yarn install

# Copy the rest of the source code
COPY . .

# Build everything
RUN yarn build

# Now set production environment for runtime
ENV NODE_ENV=production
ENV SERVE_STATIC=true
ENV ATTACH_STANDARD_MIDDLEWARE=true

# Verify build artifacts exist
RUN test -d dist && echo "✅ Client build found in dist/"
RUN test -d dist/server && echo "✅ Server build found"
RUN test -f dist/server/app/environments/prod/main.mjs && echo "✅ Prod environment found"

# Create symlink so Node can resolve workspace dependencies from dist/server
RUN ln -s /work/apps/server/node_modules /work/dist/server/node_modules

# Verify the client index.html exists (Vite creates index.html directly)
RUN test -f /work/apps/client/dist/index.html && echo "✅ Client index.html found"

# The dist directory structure should now be:
# /work/dist/index.html (client entry point)
# /work/dist/assets/* (client assets)
# /work/dist/server/* (server code)

# Rebuild native modules for the container architecture
RUN npm rebuild better-sqlite3

# Copy entrypoint script
COPY scripts/docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Change ownership to node user
RUN chown -R node:node /work

USER node

EXPOSE 3789

# Use entrypoint script to run migrations then start server
CMD ["/docker-entrypoint.sh"]
