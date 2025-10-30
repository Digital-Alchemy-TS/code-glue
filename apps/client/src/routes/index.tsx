import { createFileRoute, Link } from "@tanstack/react-router"
import { Text, View } from "tamagui"
import { useSnapshot } from "valtio/react"

import { store } from "../store"

export const Route = createFileRoute("/")({ component: App })

function App() {
	const { automations } = useSnapshot(store)

	return (
		<View>
			{Array.from(automations, ([, automation]) => (
				<Link
					key={automation.id}
					to="/automation/$id"
					params={{ id: automation.id }}
				>
					<Text>{automation.title}</Text>
				</Link>
			))}
			<View>
				<Link to="/automation/create">
					<Text>Create Automation</Text>
				</Link>
			</View>
		</View>
	)
}
