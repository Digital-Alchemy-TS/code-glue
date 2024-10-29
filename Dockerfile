# * Step 1: Build
FROM oven/bun AS build
WORKDIR /app

# - Install dependencies
COPY package.json package.json
COPY bun.lockb bun.lockb

RUN bun install

# - Create build
COPY ./src ./src
RUN bun build \
    --compile \
    --sourcemap \
    --bytecode \
    --minify-whitespace \
    --minify-syntax \
    --target=bun \
    --outfile server \
    build/entry/prod/main.ts

# * Step 2: Finalize
FROM gcr.io/distroless/base
LABEL org.opencontainers.image.source="https://github.com/Digital-Alchemy-TS/code-glue"

ARG GIT_COMMIT
ENV GIT_COMMIT=$GIT_COMMIT

COPY --from=build /app/server server

CMD ["./server"]
EXPOSE 3000
