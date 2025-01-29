import {
  GetApis,
  InternalDefinition,
  is,
  LIB_BOILERPLATE,
  TBlackHole,
  TContext,
  TServiceParams,
} from "@digital-alchemy/core";

import { AutomationTeardown } from "../../utils/index.mts";

const REAL_BOILERPLATE = (internal: InternalDefinition) =>
  internal.boot.loadedModules.get("boilerplate") as GetApis<
    typeof LIB_BOILERPLATE
  >;

export function BoilerplatePatchService({
  als,
  config,
  internal,
  logger,
  patch,
}: TServiceParams) {
  function build(
    context: TContext,
    remover: AutomationTeardown,
  ): Partial<TServiceParams> {
    const scheduler = REAL_BOILERPLATE(internal)?.scheduler?.(context);
    const refs = patch.tracker.track(context, new Set());
    remover.register(
      is.removeFn(() => {
        refs.forEach(({ remove }) => remove());
      }),
      `boilerplate`,
    );
    is.keys(scheduler).forEach(key => {
      const original = scheduler[key];
      // @ts-expect-error I don't feel like fixing
      scheduler[key] = (a: unknown, b: unknown) => {
        // @ts-expect-error I don't feel like fixing
        const out = original(a, b);
        const remove = internal.removeFn(() => {
          logger.warn("REMOVED");
          refs.delete(remove);
          out();
        });
        refs.add(remove);
        return remove;
      };
    });

    const event = internal?.utils?.event;
    const patchedEvent = {
      ...event,
      on(name: string, callback: () => TBlackHole) {
        const out = event.on(name, callback);
        refs.add(
          internal.removeFn(() => {
            logger.trace("[%s] cleaning up event listener {%s}", context, name);
            event.removeListener(name, callback);
          }),
        );
        return out;
      },
    };

    return {
      als,
      config,
      context,
      event: patchedEvent,
      internal,
      // lifecycle doesn't really make sense in this context
      lifecycle: undefined,
      logger: internal.boilerplate.logger.context(context),
      scheduler,
    };
  }
  return { build };
}
