import { createFileRoute, Link } from "@tanstack/react-router"
import { useSnapshot } from "valtio/react"

import { store } from "../store"

export const Route = createFileRoute("/")({ component: App })

function App() {
	const { automations } = useSnapshot(store)

	return (
		<div>
			<ul>
				{Array.from(automations, ([, automation]) => (
					<Link
						key={automation.id}
						to="/automation/$id"
						params={{ id: automation.id }}
					>
						<li>{automation.title}</li>
					</Link>
				))}
				<li>
					<Link to="/automation/create">Create Automation</Link>
				</li>
			</ul>
		</div>
	)
}
