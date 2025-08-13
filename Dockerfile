# Dockerfile for Code Glue addon with runtime build

FROM node:22-alpine
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache git jq wget bash

# Enable Corepack to use the correct Yarn version
RUN corepack enable

# Copy all source files
COPY . .

# Initialize and update submodules if .gitmodules exists
RUN if [ -f ".gitmodules" ]; then git submodule update --init --recursive; fi

# Install dependencies
RUN yarn install

# Make runtime script executable
RUN chmod +x ./scripts/runtime-build-start.sh

# Set default environment
ENV NODE_ENV=production

# Run!
CMD ["./scripts/runtime-build-start.sh"]
