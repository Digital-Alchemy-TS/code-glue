import * as monaco from "monaco-editor"

// List of refBy methods that support string parameters
// Add new methods here as they're added to the refBy service
const refByMethods = [
	{ name: "id", detail: "(entity_id: string)" },
	{ name: "area", detail: "(area: string)" },
	{ name: "device", detail: "(device: string)" },
	{ name: "floor", detail: "(floor: string)" },
	{ name: "label", detail: "(label: string)" },
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
