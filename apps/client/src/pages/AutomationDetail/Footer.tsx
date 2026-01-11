import React from "react"

import { Layout, Text } from "@code-glue/paradigm"
import { Logs } from "@/components/Logs"
import { useCurrentAutomation } from "@/hooks/useAutomation"

export const Footer = () => {
	const { automationId } = useCurrentAutomation()

	if (typeof automationId !== "string") {
		throw new Error(
			`Expected automationId to be a string, got ${typeof automationId}`,
		)
	}

	const tabs = React.useMemo(() => {
		return [
			{ label: "Logs", content: <Logs automationId={automationId} /> },
			{ label: "Notes", content: <Text>TODO: Notes Content</Text> },
		]
	}, [automationId])

	return <Layout.TabSection tabs={tabs} />
}
