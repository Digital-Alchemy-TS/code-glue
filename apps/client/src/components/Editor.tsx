import {
	loader,
	type Monaco,
	Editor as MonacoEditor,
} from "@monaco-editor/react"
import { setupTypeAcquisition } from "@typescript/ata"
import * as monaco from "monaco-editor"
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker"
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker"
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker"
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker"
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker"
import React, { useCallback } from "react"
import ts from "typescript"
import { useSnapshot } from "valtio"

import { store } from "../store"

import type { editor } from "monaco-editor"

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

loader.config({ monaco })
loader.init()

export type EditorProps = {
	/**
	 * The 'path' for the current file. This should match up with whatever is sent for default value.
	 */
	path: string
	/**
	 * Starting value for the editor and the given path. This should be updated as the path changes, but will only be read in once for each path value.
	 */
	defaultValue: string
	/**
	 * Updates every time *anything* in the editor changes and sends the complete contents.
	 */
	onChange?: (value: string) => void
	/**
	 * Constraints for the editor
	 */
	// This will be passed through ATA and loaded into types but not added to the editor shown to the user
	fileHeader?: string
}

export const Editor: React.FC<EditorProps> = ({
	path,
	defaultValue,
	onChange,
	fileHeader,
}) => {
	const snapshot = useSnapshot(store)
	const editorRef = React.useRef<editor.IStandaloneCodeEditor | null>(null)
	const monacoRef = React.useRef<Monaco | null>(null)
	const [monacoReady, setMonacoReady] = React.useState(false)

	const ata = useCallback(() => {
		const monaco = monacoRef.current

		if (monaco !== null) {
			return setupTypeAcquisition({
				projectName: "CodeGlue",
				typescript: ts,
				logger: console,
				delegate: {
					receivedFile: (code: string, _path: string) => {
						const filePath = `file://${_path}`

						// load in the local types in place of the default placeholder ones
						if (
							filePath ===
							"file:///node_modules/@digital-alchemy/hass/dist/dev/mappings.d.mts"
						) {
							code = snapshot.typeWriter.mappings
						}
						if (
							filePath ===
							"file:///node_modules/@digital-alchemy/hass/dist/dev/registry.d.mts"
						) {
							code = snapshot.typeWriter.registry
						}
						if (
							filePath ===
							"file:///node_modules/@digital-alchemy/hass/dist/dev/services.d.mts"
						) {
							code = snapshot.typeWriter.services
						}

						monaco.languages.typescript.typescriptDefaults.addExtraLib(
							code,
							filePath,
						)
					},
				},
			})
		}

		throw new Error("Monaco not initialized")
	}, [
		snapshot.typeWriter.mappings,
		snapshot.typeWriter.registry,
		snapshot.typeWriter.services,
	])

	const handleEditorBeforeMount = (monaco: Monaco) => {
		monacoRef.current = monaco

		// Configure TypeScript compiler options
		monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
			target: monaco.languages.typescript.ScriptTarget.Latest,
			moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
			module: monaco.languages.typescript.ModuleKind.CommonJS,
			allowNonTsExtensions: true,
			allowSyntheticDefaultImports: true,
			esModuleInterop: true,
			typeRoots: ["/globals.ts"],
		})
		monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true)
	}

	const handleOnMount = (
		editor: editor.IStandaloneCodeEditor,
		monaco: Monaco,
	) => {
		editorRef.current = editor

		// Measure Fonts
		document.fonts.ready.then(() => {
			monaco.editor.remeasureFonts()
		})

		setMonacoReady(true)
	}

	React.useEffect(() => {
		if (fileHeader && monacoReady && monacoRef.current) {
			monacoRef.current.languages.typescript.typescriptDefaults.addExtraLib(
				`${snapshot.typeWriter}\n\n${fileHeader}`,
				"file:///globals.ts",
			)

			ata()(fileHeader)
		}
	}, [fileHeader, ata, snapshot.typeWriter, monacoReady])

	const handleOnChange = (value: string | undefined) => {
		if (onChange && value) {
			onChange(value)
		}
	}

	return (
		<MonacoEditor
			height="400px"
			defaultLanguage="typescript"
			defaultValue={defaultValue}
			beforeMount={handleEditorBeforeMount}
			onChange={handleOnChange}
			onMount={handleOnMount}
			language="typescript"
			path={path}
			options={{
				minimap: { enabled: false },
				tabSize: 2,
				fontFamily: "Monaspace Argon",
			}}
		/>
	)
}
