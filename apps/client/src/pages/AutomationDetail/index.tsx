import { useHotkeys } from "react-hotkeys-hook"

import { Column, Layout } from "@code-glue/paradigm"
import { Editor } from "@/components/Editor"
import { useCurrentAutomation } from "@/hooks/useAutomation"
import { Footer } from "./Footer"
import { AutomationHeader } from "./Header"

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
		<Layout.VerticalSplit
			top={
				<Column grow>
					<AutomationHeader />
					<Editor />
				</Column>
			}
			bottom={<Footer />}
		/>
	)
}
