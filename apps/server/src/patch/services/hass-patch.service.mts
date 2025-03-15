import {
  GetApis,
  is,
  RemoveCallback,
  TContext,
  TServiceParams,
} from "@digital-alchemy/core";
import {
  ByIdProxy,
  EventsService,
  LIB_HASS,
  PICK_ENTITY,
  ReferenceService,
} from "@digital-alchemy/hass";

import { AutomationTeardown } from "../../utils/index.mts";

type tHass = GetApis<typeof LIB_HASS>;

export function HassPatchService({
  logger,
  params,
  event,
  patch,
  internal,
}: TServiceParams) {
  function build(
    context: TContext,
    hass: tHass,
    remover: AutomationTeardown,
  ): tHass {
    const refs = patch.tracker.track(context, new Set<RemoveCallback>());
    // Building up a new reference extension to not pollute the main app
    const refBy = ReferenceService(params);
    const id = refBy.id;
    // prevent the loaded service from creating a leak here
    // by repeatedly creating refs for the same entity
    const loaded = new Map<PICK_ENTITY, ByIdProxy<PICK_ENTITY>>();
    remover.register(
      internal.removeFn(() => refs.forEach(({ remove }) => remove())),
      `hass`,
    );

    // Keep track of all refs that get generated
    refBy.id = function <ENTITY extends PICK_ENTITY>(
      entity_id: ENTITY,
    ): ByIdProxy<ENTITY> {
      if (!loaded.has(entity_id)) {
        const out = id(entity_id);
        refs.add(internal.removeFn(() => out.removeAllListeners()));
        logger.trace({ entity_id }, "create reference");
        loaded.set(entity_id, out);
        return out;
      }
      logger.trace({ entity_id }, "pulling from reference cache");
      return loaded.get(entity_id) as ByIdProxy<ENTITY>;
    };
    const socket = hass.socket;

    return {
      ...hass,
      events: EventsService({ event } as TServiceParams),
      refBy,
      socket: {
        ...socket,
        onConnect(callback) {
          const { remove } = hass.socket.onConnect(callback);
          const rm = internal.removeFn(() => remove());
          refs.add(rm);
          return internal.removeFn(() => {
            if (!refs.has(rm)) {
              return;
            }
            remove();
            refs.delete(rm);
          });
        },
        onEvent(data) {
          const { remove } = hass.socket.onEvent(data);
          const rm = internal.removeFn(() => remove());
          refs.add(rm);
          return internal.removeFn(() => {
            if (!refs.has(rm)) {
              return;
            }
            remove();
            refs.delete(rm);
          });
        },
      },
    };
  }

  return { build };
}
