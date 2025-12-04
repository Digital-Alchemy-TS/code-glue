import { loader } from "@monaco-editor/react"
import { shikiToMonaco } from "@shikijs/monaco"
import * as monaco from "monaco-editor"
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker"
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker"
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker"
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker"
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker"
import { createHighlighter } from "shiki"

// Load Monaco locally vs. via the CDN
self.MonacoEnvironment = {
	getWorker(_, label) {
		if (label === "json") {
			return new jsonWorker()
		}
		if (label === "css" || label === "scss" || label === "less") {
			return new cssWorker()
		}
		if (label === "html" || label === "handlebars" || label === "razor") {
			return new htmlWorker()
		}
		if (label === "typescript" || label === "javascript") {
			return new tsWorker()
		}
		return new editorWorker()
	},
}

// Create the highlighter, it can be reused
const highlighter = await createHighlighter({
	themes: ["vitesse-dark", "vitesse-light"],
	langs: ["javascript", "typescript", "vue"],
})

// Register TS and JS
monaco.languages.register({ id: "typescript" })
monaco.languages.register({ id: "javascript" })

shikiToMonaco(highlighter, monaco)

loader.config({ monaco })
loader.init()
