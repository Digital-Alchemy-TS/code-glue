import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "unfonts.css"

import { Frame } from "@/components/Frame"

// init the editor
import("@/components/monacoInit")

const rootElement = document.getElementById("root")
if (!rootElement) {
	throw new Error('Root element with id "root" not found')
}

createRoot(rootElement).render(
	<StrictMode>
		<Frame />
	</StrictMode>,
)
