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
      // Push automation to server
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
