import { proxy, useSnapshot } from "valtio"

import { createAutomation, emptyAutomation, store } from "@/store"
import { useQuery } from "./useQuery"

export const useCurrentAutomation = () => {
	const [automationId, setCurrentAutomationId] = useQuery(
		useQuery.queries.currentAutomationId,
	)

	const automation = automationId
		? store.automations.get(automationId)
		: undefined

	const automationSnapshot = useSnapshot(automation || proxy(emptyAutomation))

	const saveCurrentAutomation = async () => {
		// format the document before save
		await store.monaco.editor?.getAction("editor.action.formatDocument")?.run()

		if (automation) {
			automation.update({
				body: store.state.currentEditorBody,
			})
		} else {
			const newAutomation = createAutomation({
				title: store.state.newAutomationTitle,
				body: store.state.currentEditorBody,
			})

			setCurrentAutomationId(newAutomation.id)
		}

		// reset edited state
		store.state.isBodyEdited = false
	}

	return {
		automationId,
		automation,
		automationSnapshot,
		saveCurrentAutomation,
	}
}
