import { useHotkeys } from "react-hotkeys-hook"

import { Column } from "@code-glue/paradigm"
import { Editor } from "@/components/Editor"
import { useCurrentAutomation } from "@/hooks/useAutomation"
import { Footer } from "./Footer"
import { Header } from "./Header"

export const AutomationDetail = () => {
	const { saveCurrentAutomation } = useCurrentAutomation()
	/**
	 * Hotkeys for the automation editor and header
	 */
	useHotkeys(
		"mod+s",
		() => {
			console.log("save!")
			saveCurrentAutomation()
		},
		{ enableOnFormTags: true, preventDefault: true },
	)
	return (
		<Column grow>
			<Header />

			<Column grow>
				<Editor />
			</Column>

			<Footer />
		</Column>
	)
}
