import {
  GetApis,
  InternalDefinition,
  LIB_BOILERPLATE,
  TContext,
  TServiceParams,
} from "@digital-alchemy/core";

const REAL_BOILERPLATE = (internal: InternalDefinition) =>
  internal.boot.loadedModules.get("boilerplate") as GetApis<
    typeof LIB_BOILERPLATE
  >;

export function BoilerplatePatchService({
  als,
  config,
  internal,
}: TServiceParams) {
  function build(context: TContext): Partial<TServiceParams> {
    return {
      als,
      config,
      context,
      event: internal?.utils?.event,
      internal,
      // lifecycle doesn't really make sense in this context
      lifecycle: undefined,
      logger: internal.boilerplate.logger.context(context),
      scheduler: REAL_BOILERPLATE(internal)?.scheduler?.(context),
    };
  }
  return { build };
}
