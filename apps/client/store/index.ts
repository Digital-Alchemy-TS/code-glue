import { proxy } from 'valtio'

import { automationStore } from './automation'

export const store = proxy({
  automations: automationStore,
})

const getAutomationsFromServer = () => {
  return fetch('http://localhost:3000/api/v1/automation', { method: 'GET' })
    .then((response) => response.json())
    .then((json) => {
      console.log('automations', json)
      json.map((automation) => {
        const existingAutomation = store.automations.get(automation.id)

        if (!existingAutomation) {
          store.automations.set(automation.id, automation)
        } else {
          Object.keys(automation).forEach((key) => {
            existingAutomation[key] = automation[key]
          })
        }
      })
    })
    .catch((error) => {
      console.error(error)
    })
}

console.log('getting automations')
getAutomationsFromServer()
