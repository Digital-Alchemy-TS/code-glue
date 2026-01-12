import { type Monaco, Editor as MonacoEditor } from "@monaco-editor/react"
import React from "react"

import { appConfig } from "@/config"
import { codeGlueLight } from "@/design/editorThemes"
import { useCurrentAutomation } from "@/hooks/useAutomation"
import { store } from "@/store"

import type { editor } from "monaco-editor"

export const Editor: React.FC = () => {
	const monacoRef = React.useRef<Monaco | null>(null)
	const editorRef = React.useRef<editor.IStandaloneCodeEditor | null>(null)

	const { automation, automationId, automationSnapshot } =
		useCurrentAutomation()
	const path = automationId ? `/automations/${automationId}.ts` : undefined

	/**
	 * Support for automation draft saving with debounce
	 */
	const draftDebounceTimerRef = React.useRef<number | null>(null)
	const currentAutomationRef = React.useRef<typeof automation>(automation)

	const handleEditorBeforeMount = (monaco: Monaco) => {
		monacoRef.current = monaco
	}

	const handleEditorChange = React.useCallback((value: string | undefined) => {
		// if we don't have a value, do nothing. Not sure what would cause this.
		if (!value) return

		// if we have a value we can assume the model has been edited.
		if (currentAutomationRef.current) {
			currentAutomationRef.current.setIsEdited(true)
		}

		// cancel the previous timer if it exists
		if (draftDebounceTimerRef.current !== null) {
			window.clearTimeout(draftDebounceTimerRef.current)
		}

		// start a new timer to save the draft after a delay
		draftDebounceTimerRef.current = window.setTimeout(() => {
			const currentAutomationState = currentAutomationRef.current

			// update the edited state using data and save the draft
			// TODO Move this into the store as a derived state
			if (currentAutomationState) {
				currentAutomationState.setIsEdited(
					currentAutomationState.body !== value,
				)

				currentAutomationState.update({ draft: value })
			}
		}, 2_000)
	}, [])

	const handleOnMount = (
		editor: editor.IStandaloneCodeEditor,
		monaco: Monaco,
	) => {
		editorRef.current = editor
		store.monaco.editor = editor
		store.monaco.instance = monaco

		// Measure Fonts
		document.fonts.ready.then(() => {
			monaco.editor.remeasureFonts()
		})
	}

	return (
		<MonacoEditor
			{...{
				language: "typescript",
				theme: codeGlueLight.name,
				defaultValue: automationSnapshot.body,
				beforeMount: handleEditorBeforeMount,
				onChange: handleEditorChange,
				onMount: handleOnMount,

				options: {
					formatOnPaste: true,
					formatOnType: true,
					minimap: { enabled: false },
					tabSize: appConfig.editor.tabSize,
					rulers: [appConfig.editor.printWidth],
					fontSize: appConfig.editor.defaultFontSize,
					fontFamily: appConfig.editor.font,
					fontWeight: "260",
					fontLigatures:
						"'calt', 'ss01', 'ss02', 'ss03', 'ss04', 'ss05', 'ss06', 'ss07', 'ss08', 'ss09', 'ss10', 'liga'",
					fontVariations: true,
					allowVariableFonts: true,
					automaticLayout: true,
					occurrencesHighlight: "off",
					scrollBeyondLastLine: false,
					quickSuggestions: {
						strings: true,
					},
					codeLens: false,
				},

				...(path && { path }),
			}}
		/>
	)
}
