import { NuqsAdapter } from "nuqs/adapters/react"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "unfonts.css"

import { Frame } from "@/components/Frame"

// init the editor
import "@/components/Editor/init"

const rootElement = document.getElementById("root")
if (!rootElement) {
	throw new Error('Root element with id "root" not found')
}

createRoot(rootElement).render(
	<StrictMode>
		<NuqsAdapter>
			<Frame />
		</NuqsAdapter>
	</StrictMode>,
)
