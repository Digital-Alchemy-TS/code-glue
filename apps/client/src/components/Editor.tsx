import { type Monaco, Editor as MonacoEditor } from "@monaco-editor/react"
import { setupTypeAcquisition } from "@typescript/ata"
import React, { useCallback } from "react"
import ts from "typescript"
import { useSnapshot } from "valtio"

import type { editor } from "monaco-editor"
import { useCurrentAutomation } from "@/hooks/useAutomation"
import { store } from "@/store"

export const Editor: React.FC = () => {
	const { automationId, automationSnapshot } = useCurrentAutomation()
	const path = automationId ? `/automations/${automationId}.ts` : undefined

	const [, setBody] = React.useState(automationSnapshot.body)

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
			moduleDetection: 3, // https://github.com/microsoft/monaco-editor/issues/2976
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
		if (monacoReady && monacoRef.current) {
			monacoRef.current.languages.typescript.typescriptDefaults.addExtraLib(
				`${snapshot.typeWriter}\n\n${snapshot.automationHeader}`,
				"file:///globals.ts",
			)

			ata()(snapshot.automationHeader)
		}
	}, [ata, snapshot.typeWriter, monacoReady, snapshot.automationHeader])

	return (
		<MonacoEditor
			{...{
				language: "typescript",
				defaultValue: automationSnapshot.body,
				beforeMount: handleEditorBeforeMount,
				onChange: (value: string | undefined) => {
					setBody(value || "")
				},
				onMount: handleOnMount,
				options: {
					minimap: { enabled: false },
					tabSize: 2,
					fontFamily: "Monaspace Argon",
				},

				...(path && { path }),
			}}
		/>
	)
}
