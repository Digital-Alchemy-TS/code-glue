import { proxy } from 'valtio'

import { automationStore } from './automation'

export const store = proxy({
  automations: automationStore,
})
