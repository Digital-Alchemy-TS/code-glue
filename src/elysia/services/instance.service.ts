import { TServiceParams } from "@digital-alchemy/core";
import { Elysia } from "elysia";

export function ElysiaInstance({ logger, lifecycle, config }: TServiceParams) {
  const instance = new Elysia({
    precompile: true,
    serve: {
      development: config.boilerplate.NODE_ENV === "local",
    },
  }).state("tag", "unknown");

  lifecycle.onReady(() => {
    instance.listen(config.elysia.PORT);
    logger.info({ port: config.elysia.PORT }, "server listen");
  });

  lifecycle.onShutdownStart(async () => {
    await instance.stop();
  });

  return instance;
}
