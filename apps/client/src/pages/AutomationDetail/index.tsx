import React from "react"
import { useHotkeys } from "react-hotkeys-hook"

import { Column, Layout, Text } from "@code-glue/paradigm"
import { Editor } from "@/components/Editor"
import { Logs } from "@/components/Logs"
import { useCurrentAutomation } from "@/hooks/useAutomation"
import { AutomationHeader } from "./Header"

export const AutomationDetail = () => {
	const { automationId, saveCurrentAutomation } = useCurrentAutomation()
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

	const tabs = React.useMemo(() => {
		return [
			{
				label: "Logs",
				content: <Logs automationId={automationId || undefined} />,
			},
			{ label: "Notes", content: <Text>TODO: Notes Content</Text> },
		]
	}, [automationId])

	return (
		<Column grow>
			<AutomationHeader />
			<Layout.VerticalSplitWithTabPanel
				autosaveId="automation-detail-split"
				content={
					<Column grow>
						<Editor />
					</Column>
				}
				tabs={tabs}
			/>
		</Column>
	)
}
