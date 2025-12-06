import { proxy, useSnapshot } from "valtio"

import { appConfig } from "@/config"
import { emptyAutomation, store } from "@/store"
import { useQuery } from "./useQuery"

export const useCurrentAutomation = () => {
	const [automationId] = useQuery(appConfig.queryStrings.currentAutomationId)

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
