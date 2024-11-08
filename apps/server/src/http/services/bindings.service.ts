import { BootstrapException, TServiceParams } from "@digital-alchemy/core";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastify, {
  FastifyBaseLogger,
  FastifyHttpOptions,
  FastifyHttpsOptions,
} from "fastify";
import { Server } from "https";

import { HttpInstance } from "../types";
const LATE = -1000;

export function Bindings({
  logger,
  lifecycle,
  config,
  context,
  http,
}: TServiceParams) {
  let httpServer: HttpInstance;
  let extraOptions: FastifyHttpOptions<Server, FastifyBaseLogger> = {};

  lifecycle.onPostConfig(async function onPostConfig() {
    extraOptions.bodyLimit ??= config.http.BODY_LIMIT;
    extraOptions.connectionTimeout ??= config.http.CONNECTION_TIMEOUT;
    extraOptions.keepAliveTimeout ??= config.http.KEEP_ALIVE_TIMEOUT;
    extraOptions.ignoreTrailingSlash ??= config.http.IGNORE_TRAILING_SLASH;
    extraOptions.maxParamLength ??= config.http.MAX_PARAM_LENGTH;
    extraOptions.caseSensitive ??= config.http.CASE_SENSITIVE;

    httpServer = fastify(extraOptions).withTypeProvider<TypeBoxTypeProvider>();
    out.httpServer = httpServer;

    if (config.http.ATTACH_STANDARD_MIDDLEWARE) {
      httpServer.register(cors, {
        allowedHeaders: [
          "Origin",
          "X-Requested-With",
          "Content-Type",
          "Accept",
          "Authorization",
        ],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        origin: "*",
      });
      httpServer.register(helmet, {});
    }
    await http.hooks.setup(httpServer);
  });

  lifecycle.onReady(async function onReady() {
    http.errors.setup(httpServer);
    const port = config.http.PORT;
    const options = { host: config.http.LISTEN_HOST, port };
    if (!port) {
      return;
    }
    try {
      await httpServer.listen({ ...options });
    } catch (error) {
      logger.fatal({ error });
      process.exit();
    }
    await new Promise<void>(done =>
      httpServer.ready(() => {
        logger.info({ ...options, name: onReady }, `server listen`);
        done();
      }),
    );
  }, LATE);

  lifecycle.onShutdownStart(async function onShutdownStart() {
    logger.info({ name: onShutdownStart }, `server teardown`);
    await httpServer.close();
  });

  function configure(
    options: Partial<FastifyHttpsOptions<Server, FastifyBaseLogger>>,
  ) {
    if (httpServer) {
      throw new BootstrapException(
        context,
        "LATE_CONFIGURE",
        "Call configure before bootstrap event",
      );
    }
    logger.trace({ name: configure, options }, `http server configure`);
    extraOptions = {
      // shallow merge
      ...extraOptions,
      ...options,
    };
  }

  const out = {
    /**
     * Pass in extra options for the fastify constructor
     *
     * Must be called prior to server init
     */
    configure,

    /**
     * Reference to fastify
     */
    httpServer,
  };
  return out;
}
