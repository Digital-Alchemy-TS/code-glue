ARG BUILD_FROM
FROM $BUILD_FROM

# Install Node.js and yarn
RUN apt-get update && apt-get install -y \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g yarn \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy git configuration and package files
COPY .gitmodules package.json yarn.lock .yarnrc.yml tsconfig.json tsconfig.client.json ./
COPY apps/client/package.json ./apps/client/
COPY apps/server/package.json ./apps/server/

# Copy source code
COPY apps/ ./apps/
COPY packages/ ./packages/

# Install dependencies
RUN yarn install --frozen-lockfile

# Build the server application
RUN yarn server:build

# Create a non-root user for security
RUN useradd -r -u 1001 appuser && chown -R appuser:appuser /app
USER appuser

# Expose port (server runs on 3789 by default)
EXPOSE 3789

# Start the server
CMD ["yarn", "server:start"]

