import { CreateLibrary } from "@digital-alchemy/core";

import { LIB_CACHE } from "../cache";
import { LIB_DATABASE } from "../database";
import { RequestLocals } from "./helpers";
import {
  ElysiaAdminKey,
  ElysiaInstance,
  ElysiaMiddleware,
  SessionService,
  StatsInit,
} from "./services";

export const LIB_ELYSIA = CreateLibrary({
  configuration: {
    ADMIN_KEY: {
      type: "string",
    },
    CORS: {
      default: false,
      type: "boolean",
    },
    HELMET: {
      default: false,
      type: "boolean",
    },
    PORT: {
      default: 3000,
      type: "number",
    },
    SEND_TIMING: {
      default: false,
      description: "https://elysiajs.com/plugins/server-timing",
      type: "boolean",
    },
    SWAGGER: {
      default: false,
      type: "boolean",
    },
  },
  depends: [LIB_CACHE, LIB_DATABASE],
  name: "elysia",
  priorityInit: ["app", "session"],
  services: {
    AdminGuard: ElysiaAdminKey,
    ElysiaMiddleware,
    StatsInit,
    app: ElysiaInstance,
    session: SessionService,
  },
});

declare module "@digital-alchemy/core" {
  export interface LoadedModules {
    elysia: typeof LIB_ELYSIA;
  }
  export interface AsyncLocalData {
    http?: RequestLocals;
  }
  export interface AsyncLogData {
    requestId?: string;
  }
}
