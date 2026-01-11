import { type GenericParserBuilder, parseAsString } from "nuqs"

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
	// biome-ignore lint/suspicious/noExplicitAny: This can take any parser, including custom ones, so best to keep the type wide open
	queryStrings?: Record<string, GenericParserBuilder<any>>
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
	logs: {
		defaultFontSize: 14,
		font: "Monaspace Krypton",
	},
	routes: {
		home: { title: "Logs" }, // home is a special route name that will show without params in the URL
		automations: {
			title: "Automations",
			queryStrings: {
				automationId: parseAsString.withOptions({ history: "push" }),
			},
		},
		// variables: { title: "Variables" },
		// synapse: { title: "Entities" },
	} as const satisfies Record<string, Section>,
} as const

export const sectionIds = Object.keys(appConfig.routes) as Array<
	keyof typeof appConfig.routes
>

export type SectionIds = keyof typeof appConfig.routes
export type SectionTitles =
	(typeof appConfig.routes)[keyof typeof appConfig.routes]["title"]
