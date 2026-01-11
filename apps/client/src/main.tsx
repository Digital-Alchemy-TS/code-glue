import { NuqsAdapter } from "nuqs/adapters/react"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "unfonts.css"

import { preventBounceScroll } from "@code-glue/paradigm"
import { Frame } from "@/pages/Frame/Frame"

// init the editor
import "@/components/Editor/init"

// Prevent bounce scrolling on document while allowing internal scroll
preventBounceScroll()

// Make sure we have a root element to mount the app
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
