import { proxy, useSnapshot } from "valtio"

import { emptyAutomation, store } from "@/store"
import { useQuery } from "./useQuery"

export const useCurrentAutomation = () => {
	const [automationId] = useQuery(useQuery.queries.currentAutomationId)

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
