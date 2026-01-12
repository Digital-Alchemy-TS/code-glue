import { loader } from "@monaco-editor/react"
import { shikiToMonaco } from "@shikijs/monaco"
import { setupTypeAcquisition } from "@typescript/ata"
import * as monaco from "monaco-editor"
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker"
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker"
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker"
import { configureMonacoPrettier } from "monaco-prettier"
import { createHighlighter } from "shiki"
import * as ts from "typescript"
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
monaco.typescript.typescriptDefaults.setCompilerOptions({
	target: monaco.typescript.ScriptTarget.Latest,
	moduleResolution: monaco.typescript.ModuleResolutionKind.NodeJs,
	module: monaco.typescript.ModuleKind.CommonJS,
	moduleDetection: 3, // Allow automations to have the same var names without TS complaining. https://github.com/microsoft/monaco-editor/issues/2976
	allowNonTsExtensions: true,
	allowSyntheticDefaultImports: true,
	esModuleInterop: true,
	typeRoots: ["/globals.ts"],
	// Optimize worker performance
	maxNodeModuleJsDepth: 0, // Don't check node_modules JS files
	skipLibCheck: true, // Skip type checking of declaration files
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

		monaco.typescript.typescriptDefaults.addExtraLib(
			`${header}`,
			"file:///globals.ts",
		)

		// Use package whitelist from server
		const allowedPackages = new Set(
			editorSupport.typeWriter.allowedATAPackages || [],
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

						monaco.typescript.typescriptDefaults.addExtraLib(code, filePath)
					},
				},
				fetcher: async (url) => {
					let packageName = null

					const urlString = url.toString()

					if (urlString.includes("@types/")) {
						const match = urlString.match(/@types\/([^@/]+)/)
						packageName = match ? match[1] : null
					} else if (urlString.includes("/npm/")) {
						const match = urlString.match(/\/npm\/(@?[^@/]+(?:\/[^@/]+)?)@/)
						packageName = match ? match[1] : null
					}

					// Skip packages not in whitelist to prevent memory issues
					if (packageName && !allowedPackages.has(packageName)) {
						return new Response("{}", { status: 200 })
					}

					return fetch(url)
				},
			})
		}

		ata()(header)

		// Create a dummy model to prime the TypeScript worker
		// This ensures types are loaded before any editor is mounted
		const uri = monaco.Uri.parse("file:///automations/_init.ts")
		// Add code that uses the heavy types to force TS worker to load them
		const model = monaco.editor.createModel("", "typescript", uri)
		model.dispose()

		unsubscribe()
	}
})

// Prevent Monaco from auto-creating models when navigating to type definitions
// This is a workaround for https://github.com/microsoft/monaco-editor/issues/2813
const originalCreateModel = monaco.editor.createModel
monaco.editor.createModel = function (value, language, uri, ...args) {
	// If Monaco tries to create a model for a file we've already added as extraLib, skip it
	if (uri?.path.includes("node_modules")) {
		/**
		 * We return null here instead of an empty model because
		 * this way monaco will remove the peak and goto definition links entirely.
		 * If an empty model is provided, these links exist, but go to a blank file.
		 */
		// biome-ignore lint/suspicious/noExplicitAny: while types say you can't create a model this way, it works and provides the best possible UI.
		return null as any
	}
	return originalCreateModel.call(this, value, language, uri, ...args)
}

// Load Monaco via the loader
loader.config({ monaco })
loader.init()
