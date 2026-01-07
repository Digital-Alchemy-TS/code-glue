import {
	type GenericParserBuilder,
	parseAsInteger,
	parseAsString,
	type UseQueryStateOptions,
} from "nuqs"

import { codeGlueLight } from "./src/design/editorThemes"

import type {
	BundledLanguage,
	BundledTheme,
	LanguageInput,
	SpecialLanguage,
	StringLiteralUnion,
	ThemeInput,
} from "shiki/types"

type Section = {
	title: string
	id: string
	// biome-ignore lint/suspicious/noExplicitAny: This can take any parser, including custom ones, so best to keep the type wide open
	queryStrings?: Record<string, GenericParserBuilder<any>>
}

export type QueryString<T> = {
	key: string
	options?: UseQueryStateOptions<T>
}

export const appConfig = {
	editor: {
		tabSize: 2,
		printWidth: 80,
		defaultFontSize: 14,
		font: "Monaspace Argon",
		// themes to load into the editor via shiki
		themes: [codeGlueLight, "vitesse-dark", "vitesse-light"] satisfies (
			| ThemeInput
			| "none"
			| StringLiteralUnion<BundledTheme, string>
		)[],
		// languages that need to support the above themes
		languages: ["typescript", "javascript"] satisfies (
			| LanguageInput
			| SpecialLanguage
			| StringLiteralUnion<BundledLanguage, string>
		)[],
	},
	routes: [
		{
			id: "logs",
			title: "Logs",
		},
		{
			id: "automations",
			title: "Automations",
			queryStrings: {
				automationId: parseAsString.withOptions({ history: "push" }),
				testNumber: parseAsInteger,
			},
		},
		// { id: "variables", title: "Variables" },
		// {
		// 	id: "synapse",
		// 	title: "Entities",
		// },
	] as const satisfies Section[],
} as const

export const sectionIds = appConfig.routes.map((section) => section.id)

export type SectionIds = (typeof appConfig.routes)[number]["id"]
export type SectionTitles = (typeof appConfig.routes)[number]["title"]
export type SectionConfig = (typeof appConfig.routes)[number]
