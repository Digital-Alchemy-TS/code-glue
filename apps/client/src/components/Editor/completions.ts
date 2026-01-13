import * as monaco from "monaco-editor"

// List of refBy methods that support string parameters
// Add new methods here as they're added to the refBy service
const refByMethods = [
	{ name: "id", detail: "a single HASS entity" },
	{ name: "area", detail: "an area (collection of devices)" },
	{ name: "device", detail: "a HASS device" },
	{ name: "floor", detail: "floor (group for area)" },
	{ name: "label", detail: "a HASS label" },
]

export function registerCompletions(): void {
	// Add auto-parentheses for refBy methods
	monaco.languages.registerCompletionItemProvider("typescript", {
		triggerCharacters: ["."],
		provideCompletionItems: (model, position) => {
			const textUntilPosition = model.getValueInRange({
				startLineNumber: position.lineNumber,
				startColumn: 1,
				endLineNumber: position.lineNumber,
				endColumn: position.column,
			})

			// Check if we're completing after "refBy."
			if (!textUntilPosition.match(/refBy\.\w*$/)) {
				return null
			}

			const suggestions: monaco.languages.CompletionItem[] = refByMethods.map(
				(method) => ({
					label: method.name,
					kind: monaco.languages.CompletionItemKind.Method,
					insertText: `${method.name}("\${1}")\${2}`,
					insertTextRules:
						monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
					detail: method.detail,
					command: {
						title: "Quick Suggestion",
						id: "editor.action.triggerSuggest",
					},
					range: {
						startLineNumber: position.lineNumber,
						startColumn: position.column,
						endLineNumber: position.lineNumber,
						endColumn: position.column,
					},
					sortText: `0_${method.name}`, // Prioritize these suggestions
				}),
			)

			return { suggestions }
		},
	})
}
