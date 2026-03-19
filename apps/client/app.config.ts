import { type GenericParserBuilder, parseAsBoolean, parseAsString } from "nuqs"

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
	fontFamilies: [
		{
			name: "Monaspace Argon",
			local: "Monaspace Argon",
			src: "./public/fonts/Monaspace/MonaspaceArgonVar.woff2",
		},
		{
			name: "Monaspace Krypton",
			local: "Monaspace Krypton",
			src: "./public/fonts/Monaspace/MonaspaceKryptonVar.woff2",
		},
		{
			name: "Monaspace Neon",
			local: "Monaspace Neon",
			src: "./public/fonts/Monaspace/MonaspaceNeonVar.woff2",
		},
		{
			name: "Monaspace Radon",
			local: "Monaspace Radon",
			src: "./public/fonts/Monaspace/MonaspaceRadonVar.woff2",
		},
		{
			name: "Monaspace Xenon",
			local: "Monaspace Xenon",
			src: "./public/fonts/Monaspace/MonaspaceXenonVar.woff2",
		},
	] satisfies {
		name: string
		local: string
		src: string
	}[],
	editor: {
		tabSize: 2,
		printWidth: 80,
		defaultFontSize: 14,
		defaultFontWidth: 100,
		defaultFontWeight: 260,
		defaultFont: "Monaspace Argon",
		// themes to load into the editor via shiki
		themes: [
			{ name: "Code Glue Light", theme: codeGlueLight },
			{ name: "Vitesse Dark", theme: "vitesse-dark" },
			{ name: "Vitesse Light", theme: "vitesse-light" },
		] satisfies {
			name: string
			theme: ThemeInput | "none" | StringLiteralUnion<BundledTheme, string>
		}[],
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
	queries: {
		settings: parseAsBoolean.withDefault(false),
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

export type QueryIds = keyof typeof appConfig.queries
export type SectionIds = keyof typeof appConfig.routes
export type SectionTitles =
	(typeof appConfig.routes)[keyof typeof appConfig.routes]["title"]
