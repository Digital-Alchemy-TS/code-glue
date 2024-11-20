import {
  RemoveCallback,
  TContext,
  TServiceParams,
} from "@digital-alchemy/core";

export function TimersPatchService({
  patch,
  logger,
  internal: { removeFn },
}: TServiceParams) {
  function build(context: TContext) {
    const refs = patch.tracker.track(context, new Set());
    const watchedRemoves = new Map<NodeJS.Timeout, RemoveCallback>();

    return {
      clearInterval(timeout: NodeJS.Timeout) {
        const current = watchedRemoves.get(timeout);
        if (current) {
          current();
          return;
        }
        clearTimeout(timeout);
      },
      clearTimeout(timeout: NodeJS.Timeout) {
        const current = watchedRemoves.get(timeout);
        if (current) {
          current();
          return;
        }
        clearTimeout(timeout);
      },
      setInterval(callback: () => void, ms?: number) {
        const interval = setInterval(callback, ms);
        const remove = removeFn(() => {
          clearInterval(interval);
          watchedRemoves.delete(interval);
          refs.delete(remove);
        });
        watchedRemoves.set(interval, remove);
        refs.add(remove);
        return interval;
      },
      setTimeout(callback: () => void, ms?: number) {
        const timeout = setTimeout(() => {
          callback();
        }, ms);
        const remove = removeFn(() => {
          const current = watchedRemoves.has(timeout);
          if (current) {
            watchedRemoves.delete(timeout);
            refs.delete(remove);
          } else if (!timeout.hasRef()) {
            logger.debug("WAT?");
          }
          clearTimeout(timeout);
        });
        watchedRemoves.set(timeout, remove);
        refs.add(remove);
      },
    };
  }
  return { build };
}
