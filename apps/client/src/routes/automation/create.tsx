import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/automation/create")({
	loader: () => {
		throw redirect({ to: "/" })
	},
})
