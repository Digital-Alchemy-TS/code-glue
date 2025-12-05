import { type Monaco, Editor as MonacoEditor } from "@monaco-editor/react"
import { setupTypeAcquisition } from "@typescript/ata"
import React, { useCallback } from "react"
import ts from "typescript"
import { useSnapshot } from "valtio"

import { codeGlueLight } from "@/design/editorThemes"
import { MonaspaceArgon } from "@/design/fonts"
import { useCurrentAutomation } from "@/hooks/useAutomation"
import { store } from "@/store"

import type { editor } from "monaco-editor"

export const Editor: React.FC = () => {
	const { automationId, automationSnapshot } = useCurrentAutomation()
	const path = automationId ? `/automations/${automationId}.ts` : undefined

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
			moduleDetection: 3, // Allow automations to have the same var names without TS complaining. https://github.com/microsoft/monaco-editor/issues/2976
			allowNonTsExtensions: true,
			allowSyntheticDefaultImports: true,
			esModuleInterop: true,
			typeRoots: ["/globals.ts"],
		})
	}

	// React.useEffect(() => {
	// 	if (monacoReady && monacoRef.current) {
	// 		console.log("Setting monaco theme to glue-light")
	// 		monacoRef.current.editor.setTheme("glue-light")
	// 	}
	// }, [monacoReady])

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
				theme: codeGlueLight.name,
				defaultValue: automationSnapshot.body,
				beforeMount: handleEditorBeforeMount,
				onChange: (value: string | undefined) => {
					store.state.isBodyEdited = true
					store.state.currentEditorBody = value || ""
				},
				onMount: handleOnMount,
				options: {
					minimap: { enabled: false },
					tabSize: 2,
					fontSize: 14,
					fontFamily: MonaspaceArgon.family,
					fontWeight: "260",
					fontLigatures:
						"'calt', 'ss01', 'ss02', 'ss03', 'ss04', 'ss05', 'ss06', 'ss07', 'ss08', 'ss09', 'ss10', 'liga'",
					fontVariations: true,
					allowVariableFonts: true,
					automaticLayout: true,
					occurrencesHighlight: "off",
				},

				...(path && { path }),
			}}
		/>
	)
}
