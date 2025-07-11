# Multi-stage Dockerfile for building client and server

# Stage 1: Base stage - Install dependencies
FROM node:22-alpine AS base
WORKDIR /app

# Install git (needed for submodules) and yarn
RUN apk add --no-cache git

# Enable Corepack to use the correct Yarn version
RUN corepack enable

# Copy git configuration and submodule files
COPY .git .git
COPY .gitmodules .gitmodules

# Initialize and update submodules
RUN git submodule update --init --recursive

# Copy package.json files first (for better caching)
COPY package.json yarn.lock ./
COPY apps/client/package.json ./apps/client/
COPY apps/server/package.json ./apps/server/

# Install all dependencies
RUN yarn install

# Stage 2: Build stage - Build client and server
FROM base AS build

# Copy all source files
COPY . .

# Run yarn install again to ensure all dependencies are available
RUN yarn install

# Build the applications (populates dist/**)
RUN yarn build

# Stage 3: Production stage - Final runtime image
FROM node:22-alpine AS production

WORKDIR /app

# Copy built applications from build stage
COPY --from=build /app/dist ./dist

# Copy production node_modules from build stage
COPY --from=build /app/node_modules ./node_modules

# Set production environment
ENV NODE_ENV=production

# Expose port 3789
EXPOSE 3789

# Start the server (serves both API and static assets)
# Map SUPERVISOR_TOKEN to HASS_TOKEN at runtime
CMD ["sh", "-c", "export HASS_TOKEN=$SUPERVISOR_TOKEN && npx tsx dist/server/app/environments/prod/main.mjs"]
