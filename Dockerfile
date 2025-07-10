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

# add submodules
RUN git submodule update --init --recursive

# Install dependencies
RUN yarn install --frozen-lockfile

# Build the client and server application
RUN yarn build

# Copy the builds to the container
COPY dist ./
