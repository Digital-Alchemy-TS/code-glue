import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/automation/$id")({
	component: RouteComponent,
})

function RouteComponent() {
	const { id } = Route.useParams()
	return <div>Hello "/automation/{id}"!</div>
}
