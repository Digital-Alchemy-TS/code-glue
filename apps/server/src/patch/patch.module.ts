import { CreateLibrary } from "@digital-alchemy/core";

import {
  BoilerplatePatchService,
  HassPatchService,
  ReferenceTrackerService,
} from "./services";

export const LIB_MODULE_PATCHER = CreateLibrary({
  configuration: {},

  name: "patch",
  services: {
    boilerplate: BoilerplatePatchService,
    hass: HassPatchService,
    tracker: ReferenceTrackerService,
  },
});

declare module "@digital-alchemy/core" {
  export interface LoadedModules {
    patch: typeof LIB_MODULE_PATCHER;
  }
}
