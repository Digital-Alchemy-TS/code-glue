import { createFileRoute, notFound } from "@tanstack/react-router"

import { store } from "@/store"

export const Route = createFileRoute("/automation/$id")({
	beforeLoad: ({ params: { id } }) => {
		const automation = store.automations.get(id)

		if (!automation) throw notFound()
	},
})
