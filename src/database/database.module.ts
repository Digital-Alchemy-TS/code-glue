import { CreateLibrary } from "@digital-alchemy/core";

import { LIB_METRICS } from "../metrics";
import { AutomationTable } from "./services";

export const LIB_DATABASE = CreateLibrary({
  configuration: {
    SQLITE_DB: {
      description: "Where to track the application sqlite at",
      type: "string",
    },
  },
  depends: [LIB_METRICS],
  name: "database",
  services: {
    automation: AutomationTable,
  },
});

declare module "@digital-alchemy/core" {
  export interface LoadedModules {
    database: typeof LIB_DATABASE;
  }
}
