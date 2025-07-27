import { createFactory, Store } from '@mfellner/valtio-factory'
import { v4 as uuid } from 'uuid'
import { proxyMap } from 'valtio/utils'

import { SynapseEntities, SynapseEntityCreateOptions, SynapseEntityUpdateOptions } from '@code-glue/server/utils/index.mts'

import { getApiPath } from '../utils/getServerUrl'


// TODO move this somewhere shared https://github.com/Digital-Alchemy-TS/code-glue/issues/52 
export enum SynapseEntityTypes {
  binary_sensor = "binary_sensor",
  button = "button",
  date = "date",
  datetime = "datetime",
  number = "number",
  scene = "scene",
  select = "select",
  sensor = "sensor",
  switch = "switch",
  text = "text",
  time = "time",
}

const synapseFactory = createFactory<SynapseEntities>({
  createDate: '',
  documentation: '',
  id: '',
  labels: [],
  lastUpdate: '',
  name: '',
  type: SynapseEntityTypes.text,
  attributes: '',
  defaultAttributes: '',
  defaultConfig: '',
  defaultLocals: '',
  icon: '',
  locals: '',
  suggested_object_id: ''
})
  .actions({
    push() {
      return fetch(getApiPath(`/api/v1/synapse/${this.id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this),
      })
        .then((response) => response.json())
        .then((json: SynapseEntities) => {
          Object.entries(json).forEach(([key, value]) => {
            // @ts-ignore TODO, figure out how to type this UPDATE_CLIENT_TYPESCRIPT
            this[key] = value
          })
        })
        .catch((error) => {
          console.error('client -> server push error', error)
        })
    },
  })
  .actions({
    update(updates: SynapseEntityUpdateOptions) {
      Object.entries(updates).forEach(([key, value]) => {
        // @ts-ignore TODO, figure out how to type this UPDATE_CLIENT_TYPESCRIPT
        this[key] = value
      })

      this.push()
    },
  })
  .onCreate((state) => {
    // push the new automation to the server, should this happen here or via a subscription?
    state.push()
  })

export const createSynapseEntity = (initialData: SynapseEntityCreateOptions) => {
  const now = new Date().toISOString()

  const synapse = synapseFactory.create(undefined, {
    id: uuid(),
    createDate: now,
    lastUpdate: now,
    ...initialData,
  })

  // add the new variable to the store
  synapseStore.set(synapse.id, synapse)

  return synapse
}

export type Synapse = Store<typeof synapseFactory>

export const synapseStore = proxyMap<string, Synapse>([])
