import { useMatch } from "@tanstack/react-router"
import { proxy, useSnapshot } from "valtio"

import { emptyAutomation, store } from "@/store"

export const useCurrentAutomation = () => {
	const match = useMatch({ from: "/automation/$id", shouldThrow: false })
	const automationId = match ? match.params.id : undefined

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
