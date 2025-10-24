import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/automation/create")({
	component: RouteComponent,
})

function RouteComponent() {
	return <div>Hello "/automation/create"!</div>
}
