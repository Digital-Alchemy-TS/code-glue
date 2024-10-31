import {
  COERCE_CONTEXT,
  GetApis,
  InternalDefinition,
  is,
  LIB_BOILERPLATE,
  TBlackHole,
  TServiceParams,
} from "@digital-alchemy/core";
import {
  ByIdProxy,
  EventsService,
  LIB_HASS,
  PICK_ENTITY,
  ReferenceService,
} from "@digital-alchemy/hass";

const REAL_BOILERPLATE = (internal: InternalDefinition) =>
  internal.boot.loadedModules.get("boilerplate") as GetApis<
    typeof LIB_BOILERPLATE
  >;

type removals = () => TBlackHole;
type tHass = GetApis<typeof LIB_HASS>;

export function ContextBuilder(params: TServiceParams) {
  const { logger, als, config, internal, event } = params;

  function patchHass(hass: tHass): [tHass, Set<removals>] {
    logger.trace("patch hass");
    const refs = new Set<removals>();
    // Building up a new reference extension to not pollute the main app
    const refBy = ReferenceService(params);
    const id = refBy.id;
    // prevent the loaded service from creating a leak here
    // by repeatedly creating refs for the same entity
    const loaded = new Map<PICK_ENTITY, ByIdProxy<PICK_ENTITY>>();

    // Keep track of all refs that get generated
    refBy.id = function <ENTITY extends PICK_ENTITY>(
      entity_id: ENTITY,
    ): ByIdProxy<ENTITY> {
      if (!loaded.has(entity_id)) {
        const out = id(entity_id);
        refs.add(() => out.removeAllListeners());
        loaded.set(entity_id, out);
      }
      return loaded.get(entity_id) as ByIdProxy<ENTITY>;
    };
    const socket = hass.socket;

    return [
      {
        ...hass,
        events: EventsService({ event } as TServiceParams),
        refBy,
        socket: {
          ...socket,
          onConnect(callback) {
            const out = hass.socket.onConnect(callback);
            const rm = () => out.remove();
            refs.add(rm);
            return is.removeFn(() => {
              out.remove();
              refs.delete(rm);
            });
          },
          onEvent(data) {
            const out = hass.socket.onEvent(data);
            const rm = () => out.remove();
            refs.add(rm);
            return is.removeFn(() => {
              out.remove();
              refs.delete(rm);
            });
          },
        },
      },
      refs,
    ];
  }

  function modulePatcher(project: string, value: unknown) {
    switch (project as keyof TServiceParams) {
      case "hass": {
        const [result] = patchHass(value as tHass);
        return [project, result];
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
