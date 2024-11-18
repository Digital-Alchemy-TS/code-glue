import { createFactory, Store } from '@mfellner/valtio-factory'
import { v4 as uuid } from 'uuid'
import { proxyMap } from 'valtio/utils'

import { AutomationCreateOptions, AutomationUpdateOptions, StoredAutomation } from '@code-glue/server/utils/contracts/automation'

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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this),
      })
        .then((response) => response.json())
        .then((json: StoredAutomation) => {
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
    update(updates: AutomationUpdateOptions) {
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

export const createAutomation = (initialData: AutomationCreateOptions) => {
  const now = new Date().toISOString()

  const automation = automationFactory.create(undefined, {
    id: uuid(),
    createDate: now,
    lastUpdate: now,
    ...initialData,
  })

  // add the new automation to the store
  automationStore.set(automation.id, automation)

  return automation
}

export type Automation = Store<typeof automationFactory>

export const automationStore = proxyMap<string, Automation>([])
