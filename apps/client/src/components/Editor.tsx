import { type Monaco, Editor as MonacoEditor } from "@monaco-editor/react"
import { setupTypeAcquisition } from "@typescript/ata"
import React, { useCallback } from "react"
import ts from "typescript"
import { useSnapshot } from "valtio"

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
			allowNonTsExtensions: true,
			allowSyntheticDefaultImports: true,
			esModuleInterop: true,
			typeRoots: ["/globals.ts"],
			moduleDetection: 3, // https://github.com/microsoft/monaco-editor/issues/2976
		})
		monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true)

		monaco.editor.defineTheme("glue-light", {
			base: "vs",
			colors: {
				"editor.background": "#ffffff",
				"editor.foreground": "#8f8c8c",
				"editorLineNumber.foreground": "#ececec",
				"editorLineNumber.activeForeground": "#b0b0b0",
				"editor.lineHighlightBackground": "#f6f6f6",
				"editor.lineHighlightBorder": "#f6f6f6",
				"editor.selectionBackground": "#0069d91c",
				"editorCursor.foreground": "#3f8ffa",
				"editorIndentGuide.background": "#e0e0e0",
				"editorIndentGuide.activeBackground": "#3f8ffa",
				"scrollbarSlider.background": "#c0c0c06b",
				"scrollbarSlider.activeBackground": "#8f8c8c6b",
				"scrollbarSlider.hoverBackground": "#8f8c8c6b",
			},
			inherit: true,
			rules: [],
		})
	}

	React.useEffect(() => {
		if (monacoReady && monacoRef.current) {
			console.log("Setting monaco theme to glue-light")
			monacoRef.current.editor.setTheme("glue-light")
		}
	}, [monacoReady])

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
					store.state.isBodyEdited = true
					store.state.currentEditorBody = value || ""
				},
				onMount: handleOnMount,
				options: {
					minimap: { enabled: false },
					tabSize: 2,
					fontSize: 14,
					fontFamily: MonaspaceArgon.family,
					fontLigatures:
						"'calt', 'ss01', 'ss02', 'ss03', 'ss04', 'ss05', 'ss06', 'ss07', 'ss08', 'ss09', 'ss10', 'liga'",
					fontVariations: true,
					allowVariableFonts: true,
					automaticLayout: true,
				},

				...(path && { path }),
			}}
		/>
	)
}
