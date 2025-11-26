import { proxy, useSnapshot } from "valtio"

import { emptyAutomation, store } from "@/store"

export const useCurrentAutomation = () => {
	const { currentAutomationId: automationId } = useSnapshot(store.state)

	const automation = automationId
		? store.automations.get(automationId)
		: undefined

	const automationSnapshot = useSnapshot(automation || proxy(emptyAutomation))

	return {
		automationId,
		automation,
		automationSnapshot,
	}
}
