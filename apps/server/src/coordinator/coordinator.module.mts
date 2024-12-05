import { CreateLibrary } from "@digital-alchemy/core";
import { join } from "path";
import { cwd } from "process";

import { LIB_DATABASE } from "../database/index.mts";
import { LIB_MODULE_PATCHER } from "../patch/index.mts";
import {
  ContextBuilder,
  CoordinatorTeardown,
  ExecuteService,
  LoaderService,
  SynapseEntitiesService,
} from "./services/index.mts";

export const LIB_COORDINATOR = CreateLibrary({
  configuration: {
    TRANSPILE_CACHE: {
      default: false,
      description: "Debug flag",
      type: "boolean",
    },
    TRANSPILE_CACHE_PATH: {
      default: join(cwd(), "cache"),
      description: "Write target for cache files",
      type: "string",
    },
  },
  depends: [LIB_DATABASE, LIB_MODULE_PATCHER],
  name: "coordinator",
  services: {
    context: ContextBuilder,
    entities: SynapseEntitiesService,
    execute: ExecuteService,
    loader: LoaderService,
    teardown: CoordinatorTeardown,
  },
});

declare module "@digital-alchemy/core" {
  export interface LoadedModules {
    coordinator: typeof LIB_COORDINATOR;
  }
}
