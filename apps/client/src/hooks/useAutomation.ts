import { proxy, useSnapshot } from "valtio"

import { emptyAutomation, store } from "@/store"
import { useRouter } from "./useRouter"

export const useCurrentAutomation = () => {
	const [{ automationId }, navigateTo] = useRouter()

	const currentAutomation = automationId
		? store.automations.get(automationId)
		: undefined

	const automationSnapshot = useSnapshot(
		currentAutomation || proxy(emptyAutomation),
	)

	// If the given ID isn't found on the server, fallback to the index page
	if (automationId && currentAutomation === undefined) navigateTo("home")

	const saveCurrentAutomation = async () => {
		// format the document before save
		await store.monaco.editor?.getAction("editor.action.formatDocument")?.run()

		// get the most up to date document body from the editor
		const body = store.monaco.editor?.getValue()

		if (body === undefined)
			throw new Error("⚠️ Editor value is undefined on save")

		if (currentAutomation) {
			currentAutomation.update({
				_isEdited: false,
				body,
			})
		}
	}

	return {
		automationId,
		automation: currentAutomation,
		automationSnapshot,
		saveCurrentAutomation,
	}
}
