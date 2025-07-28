# Multi-stage Dockerfile for building client and server

# Stage 1: Base stage - Install dependencies
FROM node:22-alpine AS base
WORKDIR /app
ADD https://google.com cache_bust

# Install git (needed for submodules) and yarn
RUN apk add --no-cache git

# Enable Corepack to use the correct Yarn version
RUN corepack enable

# Copy git configuration and submodule files
COPY .git .git
COPY .gitmodules .gitmodules

# Initialize and update submodules
RUN git submodule update --init --recursive

# Stage 2: Build stage - Build client and server
FROM base AS build

# Install jq for JSON parsing
RUN apk add --no-cache jq curl

# Copy all source files
COPY . .

RUN yarn install

# Inject ingress URL into client code before building
COPY scripts/inject_ingress_url.sh ./inject_ingress_url.sh
RUN chmod +x ./inject_ingress_url.sh && source ./inject_ingress_url.sh

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

# Start the server with proxy (serves both API and static assets)
CMD ["node", "dist/server/start-with-proxy.mjs"]
