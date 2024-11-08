import { proxy } from 'valtio'

import { automationStore } from './automation'

export const store = proxy({
  automations: automationStore,
})

const getAutomationsFromServer = () => {
  return fetch('http://localhost:3000/api/v1/automation', { method: 'GET' })
    .then((response) => response.json())
    .then((json) => {
      console.log('got automations')
      console.log(json)
    })
    .catch((error) => {
      console.error(error)
    })
}

console.log('getting automations')
getAutomationsFromServer()
