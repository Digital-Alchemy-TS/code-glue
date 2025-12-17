import { loader } from "@monaco-editor/react"
import { shikiToMonaco } from "@shikijs/monaco"
import { setupTypeAcquisition } from "@typescript/ata"
import * as monaco from "monaco-editor"
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker"
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker"
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker"
import { configureMonacoPrettier } from "monaco-prettier"
import { createHighlighter } from "shiki"
import ts from "typescript"
import { subscribe } from "valtio"

import { appConfig } from "@/config"
import { store } from "@/store"
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

// # Configure TypeScript compiler options
monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
	target: monaco.languages.typescript.ScriptTarget.Latest,
	moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
	module: monaco.languages.typescript.ModuleKind.CommonJS,
	moduleDetection: 3, // Allow automations to have the same var names without TS complaining. https://github.com/microsoft/monaco-editor/issues/2976
	allowNonTsExtensions: true,
	allowSyntheticDefaultImports: true,
	esModuleInterop: true,
	typeRoots: ["/globals.ts"],
})

// # Configure Prettier

configureMonacoPrettier(monaco, {
	// Map Monaco language IDs to a Prettier parser
	parsers: {
		typescript: "typescript",
	},

	// Prettier options.
	prettier: {
		printWidth: appConfig.editor.printWidth,
		semi: false,
		singleQuote: false,
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

// Setup types

const unsubscribe = subscribe(store.apiStatus, () => {
	if (store.apiStatus.typesReady) {
		const editorSupport = store.editorSupport
		const header = editorSupport.automationHeader

		monaco.languages.typescript.typescriptDefaults.addExtraLib(
			`${header}`,
			"file:///globals.ts",
		)

		const ata = () => {
			return setupTypeAcquisition({
				projectName: "CodeGlue",
				typescript: ts,
				logger: console,
				delegate: {
					receivedFile: (code: string, _path: string) => {
						const filePath = `file://${_path}`

						// load in the local types in place of the default placeholder ones
						switch (filePath) {
							case "file:///node_modules/@digital-alchemy/hass/dist/dev/mappings.d.mts":
								code = editorSupport.typeWriter.mappings
								break
							case "file:///node_modules/@digital-alchemy/hass/dist/dev/registry.d.mts":
								code = editorSupport.typeWriter.registry
								break
							case "file:///node_modules/@digital-alchemy/hass/dist/dev/services.d.mts":
								code = editorSupport.typeWriter.services
								break
						}

						monaco.languages.typescript.typescriptDefaults.addExtraLib(
							code,
							filePath,
						)
					},
				},
			})
		}

		ata()(header)

		unsubscribe()
	}
})

// Load Monaco via the loader
loader.config({ monaco })
loader.init()
