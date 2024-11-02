import { is, TServiceParams } from "@digital-alchemy/core";

type Entity = unknown;

export function SynapseEntitiesService({
  event,
  logger,
  synapse,
  lifecycle,
  database,
}: TServiceParams) {
  const CURRENT_ENTITIES = new Map<string, Entity>();

  lifecycle.onReady(() => {
    database.entity.list().forEach(entity => {
      const attributes = is.empty(entity.attributes)
        ? {}
        : JSON.parse(entity.attributes);
    });
  });
}
