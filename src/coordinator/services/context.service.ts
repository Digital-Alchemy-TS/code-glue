import {
  COERCE_CONTEXT,
  GetApis,
  InternalDefinition,
  LIB_BOILERPLATE,
  TServiceParams,
} from "@digital-alchemy/core";
import { LIB_HASS } from "@digital-alchemy/hass";

const REAL_BOILERPLATE = (internal: InternalDefinition) =>
  internal.boot.loadedModules.get("boilerplate") as GetApis<
    typeof LIB_BOILERPLATE
  >;

type tHass = GetApis<typeof LIB_HASS>;

export function ContextBuilder({
  logger,
  als,
  config,
  internal,
}: TServiceParams) {
  function patchHass(hass: tHass) {
    const refs = new Set();
    // hass.refBy.id =
    return hass;
  }

  function modulePatcher(project: string, value: unknown) {
    switch (project as keyof TServiceParams) {
      case "hass": {
        return [project, patchHass(value as tHass)];
      }
      case "synapse": {
        return [project, undefined];
      }
      default: {
        return [project, value];
      }
    }
  }

  function build(name: string): TServiceParams {
    const context = COERCE_CONTEXT(`dynamic:${name}`);
    return {
      ...Object.fromEntries(
        [...internal.boot.loadedModules.keys()].map(project =>
          modulePatcher(project, internal.boot.loadedModules.get(project)),
        ),
      ),
      als,
      config,
      context,
      event: internal?.utils?.event,
      internal,
      // lifecycle doesn't really make sense in this context
      lifecycle: undefined,
      logger: internal.boilerplate.logger.context(context),
      scheduler: REAL_BOILERPLATE(internal)?.scheduler?.(context),
    } as TServiceParams;
  }
  return { build };
}
