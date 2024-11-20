import { TContext, TServiceParams } from "@digital-alchemy/core";
import { TUniqueId } from "@digital-alchemy/hass";
import { GenericSynapseEntity } from "@digital-alchemy/synapse";

import {
  SYNAPSE_ENTITIES_ADDED,
  SYNAPSE_ENTITIES_REMOVED,
  SynapseEntities,
  SynapseEntityTypes,
} from "../../utils/index.mts";

export function SynapseEntitiesService({
  event,
  logger,
  synapse,
  hass,
  lifecycle,
  context,
  database,
}: TServiceParams) {
  const CURRENT_ENTITIES = new Map<
    TUniqueId,
    [GenericSynapseEntity, SynapseEntities]
  >();

  const getDefault = (value: string) =>
    value?.startsWith?.("{") ? (JSON.parse(value) as object) : {};

  function generate(entity: SynapseEntities) {
    return;
    // eslint-disable-next-line sonarjs/no-unreachable
    logger.debug(
      { entity_id: entity.suggested_object_id, name: entity.name },
      `creating entity`,
    );
    const attributes = getDefault(entity.defaultAttributes);
    const config = getDefault(entity.defaultConfig);
    const locals = getDefault(entity.defaultLocals);

    const type = entity.type as `${SynapseEntityTypes}`;

    // @ts-expect-error i don't care, they're compatible enough
    // using the config spread to cover it up
    const generated = synapse[type]({
      attributes,
      context,
      icon: entity.icon,
      locals,
      unique_id: entity.id,
      ...config,
    }) as unknown as GenericSynapseEntity;
    CURRENT_ENTITIES.set(entity.id as TUniqueId, [generated, entity]);
  }

  lifecycle.onReady(() => database.entity.list().forEach(generate));

  event.on(SYNAPSE_ENTITIES_REMOVED, (id: TUniqueId) => {
    const [entity] = CURRENT_ENTITIES.get(id);
    if (!entity) {
      logger.warn(
        { id, size: CURRENT_ENTITIES.size },
        "[wat] removed entity already gone?",
      );
      return;
    }
    CURRENT_ENTITIES.delete(id);
    entity.purge();
  });
  event.on(SYNAPSE_ENTITIES_ADDED, generate);

  function buildForContext(context: TContext) {
    return Object.fromEntries(
      [...CURRENT_ENTITIES.entries()].map(([, [generated, entity]]) => [
        entity.suggested_object_id,
        generated.child(context),
      ]),
    );
  }

  function currentStates() {
    return Object.fromEntries(
      [...CURRENT_ENTITIES.keys()].map(unique_id => [
        unique_id,
        hass.entity.getCurrentState(hass.idBy.unique_id(unique_id)),
      ]),
    );
  }

  return {
    buildForContext,
    currentStates,
  };
}
