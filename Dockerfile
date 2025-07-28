# Dockerfile for Code Glue addon with runtime build

FROM node:22-alpine
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache git jq wget bash

# Enable Corepack to use the correct Yarn version
RUN corepack enable

# Copy git configuration and submodule files
COPY .git .git
COPY .gitmodules .gitmodules

# Initialize and update submodules
RUN git submodule update --init --recursive

# Copy all source files
COPY . .

# Install dependencies
RUN yarn install

# Create runtime build script
COPY scripts/runtime-build-start.sh ./runtime-build-start.sh
RUN chmod +x ./runtime-build-start.sh

# Set production environment
ENV NODE_ENV=production

# Runtime script will: fetch ingress → update app.json → build → start
CMD ["./runtime-build-start.sh"]
