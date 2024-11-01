import { CreateLibrary } from "@digital-alchemy/core";

import { LIB_METRICS } from "../metrics";
import { AutomationTable, VariablesTable } from "./services";

export const LIB_DATABASE = CreateLibrary({
  configuration: {},
  depends: [LIB_METRICS],
  name: "database",
  services: {
    automation: AutomationTable,
    variable: VariablesTable,
  },
});

declare module "@digital-alchemy/core" {
  export interface LoadedModules {
    database: typeof LIB_DATABASE;
  }
}
