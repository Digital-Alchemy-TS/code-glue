import {
  InternalError,
  RemoveCallback,
  TServiceParams,
} from "@digital-alchemy/core";

import { AutomationTeardown } from "../../utils/index.mts";

export function CoordinatorTeardown({ logger, context }: TServiceParams) {
  const TEARDOWN_MAP = new Map<string, AutomationTeardown>();

  function create(id: string) {
    const teardown = new Map<string, RemoveCallback>();
    TEARDOWN_MAP.set(id, {
      register(remove: RemoveCallback, type: string) {
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
        logger.debug(`teardown [%s]`, id);
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

  function teardownAll() {
    logger.info(`tearing down all automations`);
    TEARDOWN_MAP.forEach(({ teardown }) => teardown());
  }

  return {
    byId: (id: string) => TEARDOWN_MAP.get(id),
    create,
    teardownAll,
  };
}
