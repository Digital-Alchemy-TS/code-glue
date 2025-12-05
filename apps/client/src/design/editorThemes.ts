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
	},
	settings: [
		{
			name: "Comments",
			scope: ["comment", "punctuation.definition.comment"],
			settings: {
				fontStyle: "italic",
				foreground: "#b0b0b0",
			},
		},
		{
			name: "Comments: Preprocessor",
			scope: "comment.block.preprocessor",
			settings: {
				fontStyle: "",
				foreground: "#b0b0b0",
			},
		},
		{
			name: "Comments: Documentation",
			scope: ["comment.documentation", "comment.block.documentation"],
			settings: {
				foreground: "#b0b0b0",
			},
		},
		{
			name: "Invalid - Illegal",
			scope: "invalid.illegal",
			settings: {
				foreground: "#660000",
			},
		},
		{
			name: "Operators",
			scope: "keyword.operator",
			settings: {
				foreground: "#777777",
			},
		},
		{
			name: "Keywords",
			scope: ["keyword", "storage"],
			settings: {
				foreground: "#b460c6",
			},
		},
		{
			name: "Types",
			scope: ["storage.type", "support.type"],
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
			name: "Language Constants",
			scope: ["constant.language", "support.constant", "variable.language"],
			settings: {
				foreground: "#fc6d24",
			},
		},
		{
			name: "Variables",
			scope: ["variable", "support.variable"],
			settings: {
				foreground: "#f10520",
			},
		},
		{
			name: "Functions",
			scope: ["entity.name.function", "support.function"],
			settings: {
				foreground: "#297dc2",
			},
		},
		{
			name: "Functions Type",
			scope: "meta.object.type entity.name.function",
			settings: {
				foreground: "#f10520",
			},
		},
		{
			name: "Classes",
			scope: [
				"entity.name.type",
				"entity.other.inherited-class",
				"support.class",
			],
			settings: {
				foreground: "#f10520",
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
			name: "Module",
			scope: "entity.name.type.module",
			settings: {
				foreground: "#f10520",
			},
		},
		{
			name: "Sub Module",
			scope: "entity.name.type",
			settings: {
				foreground: "#297dc2",
			},
		},
		{
			name: "Type",
			scope: [
				"meta.type entity.name.type",
				"meta.type entity.name.type.module",
			],
			settings: {
				foreground: "#fc6d24",
			},
		},
		{
			name: "Exceptions",
			scope: "entity.name.exception",
			settings: {
				foreground: "#660000",
			},
		},
		{
			name: "Sections",
			scope: "entity.name.section",
			settings: {
				fontStyle: "bold",
			},
		},
		{
			name: "Numbers, Characters",
			scope: ["constant.numeric", "constant.character", "constant"],
			settings: {
				foreground: "#fc6d24",
			},
		},
		{
			name: "Strings",
			scope: "string",
			settings: {
				foreground: "#a1c659",
			},
		},
		{
			name: "Strings: Escape Sequences",
			scope: "constant.character.escape",
			settings: {
				foreground: "#777777",
			},
		},
		{
			name: "Strings: Regular Expressions",
			scope: "string.regexp",
			settings: {
				foreground: "#4B83CD",
			},
		},
		{
			name: "Strings: Symbols",
			scope: "constant.other.symbol",
			settings: {
				foreground: "#AB6526",
			},
		},
		{
			name: "Punctuation",
			scope: "punctuation",
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
			name: "HTML: Tags",
			scope: [
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
			name: "HTML: Tags | inside",
			scope: ["meta.object-literal.key"],
			settings: {
				foreground: "#a1c659",
			},
		},
		{
			name: "HTML: Tag Names",
			scope: "entity.name.tag",
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
			name: "HTML: Entities",
			scope: ["constant.character.entity", "punctuation.definition.entity"],
			settings: {
				foreground: "#AB6526",
			},
		},
		{
			name: "CSS: Selectors",
			scope: [
				"meta.selector",
				"meta.selector entity",
				"meta.selector entity punctuation",
				"entity.name.tag.css",
			],
			settings: {
				foreground: "#7A3E9D",
			},
		},
		{
			name: "CSS: Property Names",
			scope: ["meta.property-name", "support.type.property-name"],
			settings: {
				foreground: "#297dc2",
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
			name: "CSS: Important Keyword",
			scope: "keyword.other.important",
			settings: {
				fontStyle: "bold",
			},
		},
		{
			name: "Markup: Changed",
			scope: "markup.changed",
			settings: {
				foreground: "#000000",
			},
		},
		{
			name: "Markup: Deletion",
			scope: "markup.deleted",
			settings: {
				foreground: "#000000",
			},
		},
		{
			name: "Markup: Emphasis",
			scope: "markup.italic",
			settings: {
				fontStyle: "italic",
			},
		},
		{
			name: "Markup: Error",
			scope: "markup.error",
			settings: {
				foreground: "#660000",
			},
		},
		{
			name: "Markup: Insertion",
			scope: "markup.inserted",
			settings: {
				foreground: "#000000",
			},
		},
		{
			name: "Markup: Link",
			scope: "meta.link",
			settings: {
				foreground: "#4B83CD",
			},
		},
		{
			name: "Markup: Output",
			scope: ["markup.output", "markup.raw"],
			settings: {
				foreground: "#777777",
			},
		},
		{
			name: "Markup: Prompt",
			scope: "markup.prompt",
			settings: {
				foreground: "#777777",
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
			name: "Markup: Strong",
			scope: "markup.bold",
			settings: {
				fontStyle: "bold",
			},
		},
		{
			name: "Markup: Traceback",
			scope: "markup.traceback",
			settings: {
				foreground: "#660000",
			},
		},
		{
			name: "Markup: Underline",
			scope: "markup.underline",
			settings: {
				fontStyle: "underline",
			},
		},
		{
			name: "Markup Quote",
			scope: "markup.quote",
			settings: {
				foreground: "#7A3E9D",
			},
		},
		{
			name: "Markup Lists",
			scope: "markup.list",
			settings: {
				foreground: "#4B83CD",
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
			name: "Markup Inline",
			scope: "markup.inline.raw",
			settings: {
				fontStyle: "",
				foreground: "#AB6526",
			},
		},
		{
			name: "Extra: Diff Range",
			scope: ["meta.diff.range", "meta.diff.index", "meta.separator"],
			settings: {
				foreground: "#434343",
			},
		},
		{
			name: "Extra: Diff From",
			scope: "meta.diff.header.from-file",
			settings: {
				foreground: "#434343",
			},
		},
		{
			name: "Extra: Diff To",
			scope: "meta.diff.header.to-file",
			settings: {
				foreground: "#434343",
			},
		},
	],
} satisfies ThemeInput
