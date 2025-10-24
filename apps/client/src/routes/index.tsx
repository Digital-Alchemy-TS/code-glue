import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/")({ component: App })

function App() {
	return (
		<div>
			<div>Hello</div>
			<ul>
				<li>
					<Link to="/automation/create">Create Automation</Link>
				</li>
				<li>
					<Link to="/automation/$id" params={{ id: "123" }}>
						Automation 123
					</Link>
				</li>
			</ul>
		</div>
	)
}
