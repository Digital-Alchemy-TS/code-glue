import { TServiceParams } from "@digital-alchemy/core";
import { ENTITY_STATE, PICK_ENTITY, TUniqueId } from "@digital-alchemy/hass";

import { GENERIC_SUCCESS_RESPONSE } from "../../http";
import { SynapseEntities, SynapseEntityCreateOptions } from "../../utils";

type SpecialInit = Omit<RequestInit, "body"> & {
  body?: object;
  method?: "post" | "delete" | "put" | "get";
};

export function RestAPIService({ logger, config }: TServiceParams) {
  async function json<T>(path: string, opts?: SpecialInit): Promise<T> {
    const headers = { ...opts.headers } as Record<string, string>;
    const init: RequestInit = {
      headers,
      method: opts.method,
    };
    if (opts.body) {
      init.body = JSON.stringify(opts.body);
      headers["Content-Type"] = "application/json";
    }
    // init.signal = AbortSignal.timeout(config.utils.REQUEST_TIMEOUT);
    const response = await fetch(`${config.cli.BASE_URL}/api/v1/${path}`, init);

    return (await response.json()) as T;
  }

  return {
    synapse: {
      async create(body: SynapseEntityCreateOptions) {
        return await json<SynapseEntities>("/synapse", {
          body,
          method: "post",
        });
      },
      async delete(id: TUniqueId) {
        return await json<GENERIC_SUCCESS_RESPONSE>(`/synapse/${id}`, {
          method: "delete",
        });
      },
      async get(id: TUniqueId) {
        return await json<SynapseEntities>(`/synapse/${id}`);
      },
      async getAllStates() {
        return await json<
          Partial<{ [ENTITY in PICK_ENTITY]: ENTITY_STATE<ENTITY> }>
        >(`/synapse/state`);
      },
      async getState<ENTITY extends PICK_ENTITY = PICK_ENTITY>(id: TUniqueId) {
        return await json<ENTITY_STATE<ENTITY>>(`/synapse/${id}`);
      },
      async list() {
        return await json<SynapseEntities[]>(`/synapse/`);
      },
      async rebuild(id: TUniqueId) {
        return await json<GENERIC_SUCCESS_RESPONSE>(`/synapse/rebuild/${id}`);
      },
      async update(id: TUniqueId, body: Partial<SynapseEntityCreateOptions>) {
        return await json<SynapseEntities>(`/synapse/${id}`, {
          body,
          method: "put",
        });
      },
    },
  };
}
