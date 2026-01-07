import React from "react"

import { Layout, Text } from "@code-glue/paradigm"
import { AutomationLogs } from "../AutomationLogs"

export const Footer = () => {
	const tabs = React.useMemo(() => {
		return [
			{ label: "Logs", content: <AutomationLogs /> },
			{ label: "Notes", content: <Text>TODO: Notes Content</Text> },
		]
	}, [])

	return <Layout.TabSection tabs={tabs} />
}
