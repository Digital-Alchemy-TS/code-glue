import React from "react"

import { Layout, Text } from "@code-glue/paradigm"
import { AutomationLogs } from "../AutomationLogs"

export const Footer = () => {
	const tabs = React.useMemo(() => {
		return [
			{ label: "Console", content: <AutomationLogs /> },
			{ label: "Notes", content: <Text>Notes Content</Text> },
		]
	}, [])

	return <Layout.TabSection tabs={tabs} />
}
