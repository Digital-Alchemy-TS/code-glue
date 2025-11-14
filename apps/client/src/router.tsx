import { createRouter } from "@tanstack/react-router"
import { subscribe } from "valtio"

import { store } from "@/store"
// Import the generated route tree
import { routeTree } from "./routeTree.gen"

// Wait for store to be ready before allowing router creation
const waitForStore = async () => {
	if (store.isReady) return

	return new Promise<void>((resolve) => {
		const unsubscribe = subscribe(store, () => {
			if (store.isReady) {
				unsubscribe()
				resolve()
			}
		})
	})
}

export const getRouter = async () => {
	await waitForStore()

	return createRouter({
		routeTree,
		scrollRestoration: true,
		defaultPreload: "render",
		defaultPreloadStaleTime: 600_000,
	})
}
