import type { ThemeInput } from "shiki/types"

export const codeGlueLight = {
	name: "codeGlue-light",
	type: "light",
	semanticHighlighting: true,
	colors: {
		"editor.background": "#ffffff",
		"editor.foreground": "#8f8c8c",
		"editorLineNumber.foreground": "#ececec",
		"editorLineNumber.activeForeground": "#b0b0b0",
		"editor.lineHighlightBackground": "#f6f6f6",
		"editor.lineHighlightBorder": "#f6f6f6",
		"editor.selectionBackground": "#0069d938",
		"editor.selectionHighlightBackground": "#0069d904",
		"editor.selectionHighlightBorder": "#3f90fa9a",
		"editorCursor.foreground": "#3f8ffa",
		"editorIndentGuide.background": "#e0e0e0",
		"editorIndentGuide.activeBackground": "#3f8ffa",
		"scrollbarSlider.background": "#c0c0c06b",
		"scrollbarSlider.activeBackground": "#8f8c8c6b",
		"scrollbarSlider.hoverBackground": "#8f8c8c6b",
		"editorError.foreground": "#f10520",
		"editorBracketMatch.border": "#0069d918",
		"editorBracketMatch.background": "#0069d918",
		"editorBracketHighlight.foreground1": "#8f8c8c",
		"editorBracketHighlight.foreground2": "#8f8c8c",
		"editorBracketHighlight.foreground3": "#8f8c8c",
		"editorBracketHighlight.foreground4": "#8f8c8c",
		"editorBracketHighlight.foreground5": "#8f8c8c",
		"editorBracketHighlight.foreground6": "#8f8c8c",
		"editorSuggestionWidget.background": "#e0e0e0",
		"editorSuggestionWidget.foreground": "#8f8c8c",
		"editorSuggestWidget.background": "#f6f6f6",
		"editorSuggestWidget.highlightForeground": "#3f8ffa",
		"editorSuggestWidget.selectedBackground": "#3f8ffa",
		"editorSuggestWidget.border": "#c0c0c0",
		"editorRuler.foreground": "#ececec",
	},
	settings: [
		{
			name: "Comments",
			scope: [
				"comment",
				"punctuation.definition.comment",
				"comment.block.preprocessor",
				"comment.documentation",
				"comment.block.documentation",
			],
			settings: {
				fontStyle: "italic",
				foreground: "#b0b0b0",
			},
		},
		{
			name: "Invalid - Illegal & Exceptions & Markup: Error & Markup: Traceback",
			scope: [
				"invalid.illegal",
				"entity.name.exception",
				"markup.error",
				"markup.traceback",
			],
			settings: {
				foreground: "#660000",
			},
		},
		{
			name: "Operators & Strings: Escape Sequences & Markup: Output & Markup: Prompt",
			scope: [
				"keyword.operator",
				"constant.character.escape",
				"markup.output",
				"markup.raw",
				"markup.prompt",
			],
			settings: {
				foreground: "#777777",
			},
		},
		{
			name: "Keywords & Types",
			scope: ["keyword", "storage", "storage.type", "support.type"],
			settings: {
				foreground: "#b460c6",
			},
		},
		{
			name: "Types storage",
			scope: ["meta.type support.type"],
			settings: {
				foreground: "#8f8c8c",
			},
		},
		{
			name: "Language Constants & Numbers, Characters & Strings: Regular Expressions & Type & Type",
			scope: [
				"constant.language",
				"support.constant",
				"variable.language",
				"constant.numeric",
				"constant.character",
				"constant",
				"string.regexp",
				"meta.type entity.name.type",
				"meta.type entity.name.type.module",
			],
			settings: {
				foreground: "#f10520",
			},
		},
		{
			name: "Variables & Functions Type & Classes & Module & Exceptions",
			scope: [
				"variable",
				"support.variable",
				"meta.object.type entity.name.function",
				"entity.name.type",
				"entity.other.inherited-class",
				"support.class",
				"entity.name.type.module",
			],
			settings: {
				foreground: "#fc6d24",
			},
		},
		{
			name: "Functions & CSS: Property Names & Sub Module",
			scope: [
				"entity.name.function",
				"support.function",
				"meta.property-name",
				"support.type.property-name",
				"entity.name.type",
			],
			settings: {
				foreground: "#297dc2",
			},
		},
		{
			name: "JSX: Tag",
			scope: "entity.name.tag support.class",
			settings: {
				foreground: "#fc6d24",
			},
		},
		{
			name: "Punctuation & HTML: Tags",
			scope: [
				"punctuation",
				"meta.tag",
				"punctuation.definition.tag.html",
				"punctuation.definition.tag.begin.html",
				"punctuation.definition.tag.end.html",
			],
			settings: {
				foreground: "#8f8c8c",
			},
		},
		{
			name: "HTML: Doctype Declaration",
			scope: [
				"meta.tag.sgml.doctype",
				"meta.tag.sgml.doctype string",
				"meta.tag.sgml.doctype entity.name.tag",
				"meta.tag.sgml punctuation.definition.tag.html",
			],
			settings: {
				foreground: "#AAAAAA",
			},
		},
		{
			name: "HTML: Tags | inside & Strings",
			scope: ["meta.object-literal.key", "string"],
			settings: {
				foreground: "#a1c659",
			},
		},
		{
			name: "HTML: Tag Names & Strings: Regular Expressions & Markup: Link & Markup Lists",
			scope: ["entity.name.tag", "string.regexp", "meta.link", "markup.list"],
			settings: {
				foreground: "#4B83CD",
			},
		},
		{
			name: "HTML: Attribute Names",
			scope: [
				"meta.tag entity.other.attribute-name",
				"entity.other.attribute-name.html",
			],
			settings: {
				fontStyle: "italic",
				foreground: "#fc6d24",
			},
		},
		{
			name: "HTML: Entities & Strings: Symbols & Markup Inline",
			scope: [
				"constant.character.entity",
				"punctuation.definition.entity",
				"constant.other.symbol",
				"markup.inline.raw",
			],
			settings: {
				foreground: "#AB6526",
			},
		},
		{
			name: "CSS: Selectors & Markup Quote",
			scope: [
				"meta.selector",
				"meta.selector entity",
				"meta.selector entity punctuation",
				"entity.name.tag.css",
				"markup.quote",
			],
			settings: {
				foreground: "#7A3E9D",
			},
		},
		{
			name: "CSS: Property Values",
			scope: [
				"meta.property-value",
				"meta.property-value constant.other",
				"support.constant.property-value",
			],
			settings: {
				foreground: "#a1c659",
			},
		},
		{
			name: "Sections & CSS: Important Keyword & Markup: Strong",
			scope: ["entity.name.section", "keyword.other.important", "markup.bold"],
			settings: {
				fontStyle: "bold",
			},
		},
		{
			name: "Markup: Changed & Markup: Deletion & Markup: Insertion",
			scope: ["markup.changed", "markup.deleted", "markup.inserted"],
			settings: {
				foreground: "#000000",
			},
		},
		{
			name: "Markup: Emphasis & Markup: Underline",
			scope: ["markup.italic", "markup.underline"],
			settings: {
				fontStyle: "italic",
			},
		},
		{
			name: "Markup: Heading",
			scope: "markup.heading",
			settings: {
				foreground: "#AA3731",
			},
		},
		{
			name: "Markup Styling",
			scope: ["markup.bold", "markup.italic"],
			settings: {
				foreground: "#448C27",
			},
		},
		{
			name: "Extra: Diff Range & Headers",
			scope: [
				"meta.diff.range",
				"meta.diff.index",
				"meta.separator",
				"meta.diff.header.from-file",
				"meta.diff.header.to-file",
			],
			settings: {
				foreground: "#434343",
			},
		},
	],
} satisfies ThemeInput
