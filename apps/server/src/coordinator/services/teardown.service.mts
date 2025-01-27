import {
  InternalError,
  RemoveCallback,
  TContext,
  TServiceParams,
} from "@digital-alchemy/core";

type TeardownMap = {
  register(remove: RemoveCallback, type: TContext): void;
  teardown(): void;
};

export function CoordinatorTeardown({ logger, context }: TServiceParams) {
  const TEARDOWN_MAP = new Map<string, TeardownMap>();

  function create(id: string) {
    const teardown = new Map<TContext, RemoveCallback>();
    TEARDOWN_MAP.set(id, {
      register(remove: RemoveCallback, type: TContext) {
        if (teardown.has(type)) {
          throw new InternalError(
            context,
            "DUPLICATE_REMOVER",
            "This should not happen",
          );
        }
        teardown.set(type, remove);
        logger.trace({ id, type }, "register remover");
      },
      teardown() {
        logger.warn(`teardown [%s]`, id);
        teardown.forEach(({ remove }, type) => {
          remove();
          teardown.delete(type);
          logger.debug({ type }, "removing");
        });
        TEARDOWN_MAP.delete(id);
      },
    });

    return TEARDOWN_MAP.get(id);
  }

  return {
    byId: (id: string) => TEARDOWN_MAP.get(id),
    create,
  };
}
