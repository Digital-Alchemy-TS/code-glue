import { loader } from "@monaco-editor/react"
import { shikiToMonaco } from "@shikijs/monaco"
import * as monaco from "monaco-editor"
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker"
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker"
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker"
import { configureMonacoPrettier } from "monaco-prettier"
import { createHighlighter } from "shiki"

import { appConfig } from "@/config"
import prettierWorker from "./prettier.worker?worker"

// Load Monaco locally vs. via the CDN
self.MonacoEnvironment = {
	getWorker(_, label) {
		switch (label) {
			case "json":
				return new jsonWorker()
			case "javascript":
			case "typescript":
				return new tsWorker()
			case "prettier":
				return new prettierWorker()
			default:
				return new editorWorker()
		}
	},
}

// # Configure Prettier

const printWidth = 80
configureMonacoPrettier(monaco, {
	// Map Monaco language IDs to a Prettier parser
	parsers: {
		typescript: "babel",
	},

	// Prettier options.
	prettier: {
		printWidth,
		semi: false,
	},
})

// # Syntax Highlighting Setup

// Create the language highlighter, add themes and languages in appConfig
const highlighter = await createHighlighter({
	themes: appConfig.editor.themes,
	langs: appConfig.editor.languages,
})

// Register Languages with Monaco for syntax highlighting
appConfig.editor.languages.forEach((language) => {
	monaco.languages.register({ id: language })
})

// Sync Shiki with Monaco
shikiToMonaco(highlighter, monaco)

// Load Monaco via the loader
loader.config({ monaco })
loader.init()
