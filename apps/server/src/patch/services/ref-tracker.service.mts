import { TContext, TServiceParams } from "@digital-alchemy/core";
import { RemoveCallback } from "@digital-alchemy/hass";

export function ReferenceTrackerService({ logger }: TServiceParams) {
  const DYNAMIC_CONTEXTS = new Map<string, TServiceParams>();
  const REMOVERS = new Map<TContext, Set<RemoveCallback>[]>();

  function load(context: TContext, params: TServiceParams) {
    unload(context);
    DYNAMIC_CONTEXTS.set(context, params);
  }

  function unload(context: TContext) {
    if (!DYNAMIC_CONTEXTS.has(context)) {
      logger.trace("[%s] nothing to unload", context);
      return;
    }
    logger.trace("[%s] nothing to unload", context);
  }

  function track(
    context: TContext,
    remove: Set<RemoveCallback>,
  ): Set<RemoveCallback> {
    const list = REMOVERS.get(context) ?? [];
    list.push(remove);
    REMOVERS.set(context, list);
    return remove;
  }

  return { load, track };
}
