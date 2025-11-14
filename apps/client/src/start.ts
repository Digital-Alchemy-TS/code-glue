import { createStart } from "@tanstack/react-start"

// Initialize Monaco Editor only on the client side
if (typeof window !== "undefined") {
	import("@/components/monacoInit")
}

export const startInstance = createStart(() => ({}))
