import { loader } from "@monaco-editor/react"
import { shikiToMonaco } from "@shikijs/monaco"
import * as monaco from "monaco-editor"
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker"
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker"
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker"
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker"
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker"
import { createHighlighter } from "shiki"

import { appConfig } from "@/config"

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

// Create the language highlighter, add themes and languages in appConfig
const highlighter = await createHighlighter({
	themes: appConfig.editor.themes,
	langs: appConfig.editor.languages,
})

// Register Languages with Monaco
appConfig.editor.languages.forEach((language) => {
	monaco.languages.register({ id: language })
})

// Sync Shiki with Monaco
shikiToMonaco(highlighter, monaco)

// Load Monaco via the loader
loader.config({ monaco })
loader.init()
