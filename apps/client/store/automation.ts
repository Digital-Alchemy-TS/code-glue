import { createFactory, Store } from '@mfellner/valtio-factory'
import { v4 as uuid } from 'uuid'
import { proxyMap } from 'valtio/utils'

import { StoredAutomation } from '@code-glue/server/utils/contracts/automation'

const automationFactory = createFactory<StoredAutomation>({
  active: false,
  area: '',
  body: '',
  context: '',
  createDate: '',
  documentation: '',
  id: '',
  labels: [],
  lastUpdate: '',
  parent: '',
  title: '',
  version: '',
})
  .actions({
    push() {
      return fetch(`http://localhost:3000/api/v1/automation/${this.id}`, {
        method: 'PUT',
        body: JSON.stringify(this),
      })
        .then((response) => response.json())
        .then((json) => {
          Object.keys(this).forEach((key) => {
            this[key] = json[key]
          })
        })
        .catch((error) => {
          console.error(error)
        })
    },
  })
  .actions({
    update(updates: StoredAutomation) {
      Object.entries(updates).forEach(([key, value]) => {
        this[key] = value
      })

      this.push()
    },
  })
  .onCreate((state) => {
    // add the new automation to the store
    automationStore.set(state.id, state)
    // push the new automation to the server, should this happen here or via a subscription?
    state.push()
  })

export const createAutomation = (initialData: Partial<StoredAutomation>) => {
  const now = new Date().toISOString()

  return automationFactory.create(undefined, {
    id: uuid(),
    createDate: now,
    lastUpdate: now,
    ...initialData,
  })
}

export type Automation = Store<typeof automationFactory>

export const automationStore = proxyMap<string, Automation>([])
