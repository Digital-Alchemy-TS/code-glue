import {
  createModule,
  LibraryDefinition,
  OptionalModuleConfiguration,
  ServiceMap,
} from "@digital-alchemy/core";

import { commonTestConfig } from "../../tests";
import { LIB_ELYSIA } from "../elysia.module";

export const createTestRunner = (
  append?: LibraryDefinition<ServiceMap, OptionalModuleConfiguration>,
) => {
  const out = createModule.fromLibrary(LIB_ELYSIA).extend();
  if (append) {
    out.appendLibrary(append);
  }
  return commonTestConfig(out.toTest());
};
