import { proxy } from 'valtio'

import { StoredAutomation } from '@code-glue/server/src/utils'

import { automationStore, createAutomation } from './automation'

export const store = proxy({
  isReady: false,
  typesReady: false,
  automations: automationStore,
  typeWriter: ''
})

const getTypesFromServer = () => {
  fetch('http://localhost:3789/api/v1/type-writer', { method: 'GET' })
    .then((response) => response.text())
    .then((types) => {
      store.typeWriter = types
      store.typesReady = true
    }).catch((error) => {
      console.error(error)
    })
}

const getAutomationsFromServer = () => {
  return fetch('http://localhost:3789/api/v1/automation', { method: 'GET' })
    .then((response) => response.json())
    .then((json: StoredAutomation[]) => {
      json.map((automation) => {
        const existingAutomation = store.automations.get(automation.id)

        if (!existingAutomation) {
          createAutomation(automation)
        } else {
          Object.keys(automation).forEach((key) => {
            // @ts-ignore TODO, figure out how to type this UPDATE_CLIENT_TYPESCRIPT
            existingAutomation[key] = automation[key]
          })
        }
      })
      // once we have all the automations mark the store as ready
      store.isReady = true
    })
    .catch((error) => {
      console.error(error)
    })
}

getTypesFromServer()
getAutomationsFromServer()
