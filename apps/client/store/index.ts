import { proxy } from 'valtio'

import { StoredAutomation, SharedVariables } from '@code-glue/server/utils/index.mjs'

import { automationStore, createAutomation } from './automation'
import { variableStore, createVariable } from './variables'

export const store = proxy({
  isReady: false,
  typesReady: false,
  serverError: false,
  automations: automationStore,
  variables: variableStore,
  /**
   * Set this to true to show the variable creation UI
   */
  createVariable: false,
  typeWriter: '',
  globalTypes: '',

})

const setupStore = () => {
  return Promise.all([
    fetch('http://localhost:3789/api/v1/types/hidden', { method: 'GET' }).then((response) => response.text()),
    fetch('http://localhost:3789/api/v1/type-writer', { method: 'GET' }).then((response) => response.text())
  ])
    .then(([header, types]) => {
      store.globalTypes = header
      store.typeWriter = types
      store.typesReady = true
    })
    .catch(() => {
      store.serverError = true
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
    .catch(() => {
      store.serverError = true
      store.isReady = true
    })
}

const getVariablesFromServer = () => {
  return fetch('http://localhost:3789/api/v1/variable', { method: 'GET' })
    .then((response) => response.json())
    .then((json: SharedVariables[]) => {
      json.map((variable) => {
        const existingVariable = store.variables.get(variable.id)

        if (!existingVariable) {
          createVariable(variable)
        } else {
          Object.keys(variable).forEach((key) => {
            // @ts-ignore TODO, figure out how to type this UPDATE_CLIENT_TYPESCRIPT
            existingVariable[key] = variable[key]
          })
        }
      })
    })
}

setupStore()
getAutomationsFromServer()
getVariablesFromServer()