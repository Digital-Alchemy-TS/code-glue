import React from "react"

import { Layout, Text } from "@code-glue/paradigm"
import { useCurrentAutomation } from "@/hooks/useAutomation"
import { store } from "@/store"

export const Footer = () => {
	const { automation, automationSnapshot } = useCurrentAutomation()

	const tabs = React.useMemo(() => {
		return [
			{ label: "Console", content: <Text>Console Content</Text> },
			{ label: "Notes", content: <Text>Notes Content</Text> },
		]
	}, [])

	return <Layout.TabSection tabs={tabs} />
}
