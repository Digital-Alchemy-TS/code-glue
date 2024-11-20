import {
  COERCE_CONTEXT,
  GetApis,
  is,
  TContext,
  TServiceParams,
} from "@digital-alchemy/core";
import { LIB_HASS } from "@digital-alchemy/hass";

type tHass = GetApis<typeof LIB_HASS>;

const CODE_GLUE_MODULES = new Set([
  "patch",
  "code_glue",
  "metrics",
  "synapse",
  "database",
  "coordinator",
  "http",
]);

export function ContextBuilder({ internal, patch }: TServiceParams) {
  function modulePatcher(context: TContext, project: string, value: unknown) {
    if (project === "hass") {
      return [project, patch.hass.build(context, value as tHass)];
    }
    if (CODE_GLUE_MODULES.has(project)) {
      return [project, undefined];
    }
    return [project, value];
  }

  function build(name: string): TServiceParams {
    const context = COERCE_CONTEXT(`dynamic:${name}`);
    const out = {
      ...Object.fromEntries(
        [...internal.boot.loadedModules.keys()]
          .map(project =>
            modulePatcher(
              context,
              project,
              internal.boot.loadedModules.get(project),
            ),
          )
          .filter(([, value]) => !is.undefined(value)),
      ),
      ...patch.boilerplate.build(context),
    } as TServiceParams;
    return out;
  }

  return { build };
}
