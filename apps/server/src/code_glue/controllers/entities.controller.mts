import { TServiceParams } from "@digital-alchemy/core";
import { TUniqueId } from "@digital-alchemy/hass";
import { Type } from "@sinclair/typebox";

import {
  NotImplementedError,
  SynapseEntityCreateOptions,
} from "../../utils/index.mts";

const params = Type.Object({ id: Type.String() });

export function SynapseEntitiesController({
  http: { controller },
  database: { entity },
  config,
  coordinator,
  context,
  hass,
}: TServiceParams) {
  controller([config.code_glue.V1, "/synapse"], app =>
    app
      .get(
        "/state",
        {
          schema: {
            description: "Retrieve the entity states for all synapse entities",
            tags: ["synapse"],
          },
        },
        () => coordinator.entities.currentStates(),
      )
      .get(
        "/state/:id",
        {
          schema: {
            description: "Retrieve the current state of a specific entity",
            params,
            tags: ["synapse"],
          },
        },
        ({ params: { id } }) =>
          hass.entity.getCurrentState(hass.idBy.unique_id(id as TUniqueId)),
      )
      .get(
        "/",
        {
          schema: {
            description: "List entities in database",
            tags: ["synapse"],
          },
        },
        () => entity.list(),
      )
      .get(
        "/:id",
        {
          schema: {
            description: "Retrieve entity by id",
            params,
            tags: ["synapse"],
          },
        },
        ({ params: { id } }) => entity.get(id),
      )
      .delete(
        "/:id",
        {
          schema: {
            description: "Delete specific entity & purge all refs",
            params,
            tags: ["synapse"],
          },
        },
        ({ params: { id } }) => entity.remove(id),
      )
      .post(
        "/",
        {
          schema: {
            body: SynapseEntityCreateOptions,
            description: "Create new entity",
            tags: ["synapse"],
          },
        },
        ({ body }) => entity.create(body),
      )
      .post(
        "/rebuild/:id",
        {
          schema: {
            description:
              "Tear down the entity and re-create the details (except more up to date)",
            params,
            tags: ["synapse"],
          },
        },
        ({ params: { id } }) => {
          throw new NotImplementedError(
            context,
            `Cannot rebuilt ${id}, route not implemented yet`,
          );
        },
      )
      .put(
        "/:id",
        {
          schema: {
            body: SynapseEntityCreateOptions,
            description:
              "Update the definition for an entity. Does not imply rebuild",
            params,
            tags: ["synapse"],
          },
        },
        ({ body, params: { id } }) => entity.update(id, body),
      ),
  );
}
