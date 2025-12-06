import { codeGlueLight } from "./src/design/editorThemes"

import type { UseQueryStateOptions } from "nuqs"
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
	id: "automations" | "variables" | "synapse"
}

export type QueryString<T> = {
	key: string
	options?: UseQueryStateOptions<T>
}

export const appConfig = {
	queryStrings: {
		currentAutomationId: { key: "currentAutomationId" },
	} satisfies {
		// biome-ignore lint/suspicious/noExplicitAny: This can take any parser, including custom ones
		[id: string]: QueryString<any>
	},
	editor: {
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
	sections: [
		{
			id: "automations",
			title: "Automations",
		},
		// { id: "variables", title: "Variables" },
		// {
		// 	id: "synapse",
		// 	title: "Entities",
		// },
	] satisfies Section[],
} as const

export type SectionIds = (typeof appConfig.sections)[number]["id"]
export type SectionTitles = (typeof appConfig.sections)[number]["title"]
