import { CreateLibrary, HALF, MINUTE, SECOND } from "@digital-alchemy/core";
import { v4 } from "uuid";

import { LIB_METRICS } from "../metrics/index.mts";
import {
  Bindings,
  FastifyRegister,
  HttpErrors,
  HttpHooks,
  HttpInject,
  HttpLogger,
  HttpMiddleware,
  HttpSession,
  StaticFileService,
} from "./services/index.mts";
import { RequestLocals } from "./types/index.mts";

export const LIB_HTTP = CreateLibrary({
  configuration: {
    ADMIN_KEY: {
      default: v4(),
      description: "Used as comparison value for admin auth requests",
      source: ["env"],
      type: "string",
    },
    ATTACH_STANDARD_MIDDLEWARE: {
      default: false,
      description: "Attach stuff like cors",
      source: ["env"],
      type: "boolean",
    },
    BODY_LIMIT: {
      default: 1_048_576,
      description: "Max JSON body size",
      source: ["env"],
      type: "number",
    },
    CASE_SENSITIVE: {
      default: true,
      source: ["env"],
      type: "boolean",
    },
    CONNECTION_TIMEOUT: {
      default: HALF * MINUTE,
      description: "Fastify connection timeout",
      source: ["env"],
      type: "number",
    },
    IGNORE_TRAILING_SLASH: {
      default: true,
      description:
        "https://fastify.dev/docs/latest/Reference/Server/#ignoretrailingslash",
      source: ["env"],
      type: "boolean",
    },
    KEEP_ALIVE_TIMEOUT: {
      default: 5 * SECOND,
      description:
        "This sets the maximum time in milliseconds that a socket can remain idle after sending a response",
      source: ["env"],
      type: "number",
    },
    LISTEN_HOST: {
      default: "0.0.0.0",
      description: "Connection mask",
      source: ["env"],
      type: "string",
    },
    MAX_PARAM_LENGTH: {
      default: 100,
      source: ["env"],
      type: "number",
    },
    PORT: {
      default: 3789,
      description: "Server port to connect to",
      source: ["env"],
      type: "number",
    },
  },
  depends: [LIB_METRICS],

  name: "http",
  services: {
    /**
     * internal library attachments to fastify
     */
    bindings: Bindings,
    /**
     * create a new controller
     */
    controller: FastifyRegister,
    errors: HttpErrors,
    hooks: HttpHooks,
    inject: HttpInject,
    logger: HttpLogger,
    middleware: HttpMiddleware,
    session: HttpSession,
    static: StaticFileService,
  },
});

declare module "@digital-alchemy/core" {
  export interface LoadedModules {
    http: typeof LIB_HTTP;
  }

  export interface AsyncLocalData {
    http?: RequestLocals;
  }

  export interface AsyncLogData {
    /**
     * generated internally
     */
    requestId?: string;
    /**
     * from header: x-app-id
     *
     * @see RequestHeaders
     */
    appId?: string;
    /**
     * from header: x-correlation-id
     *
     * @see RequestHeaders
     */
    correlationId?: string;
    /**
     * from header: dd-trace-id
     *
     * @see RequestHeaders
     */
    datadog?: string;
  }
}
