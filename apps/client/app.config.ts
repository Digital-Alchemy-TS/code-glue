import { codeGlueLight } from "./src/design/editorThemes"

import type {
	BundledLanguage,
	BundledTheme,
	LanguageInput,
	SpecialLanguage,
	StringLiteralUnion,
	ThemeInput,
} from "shiki/types"

type SectionType = {
	title: string
	id: "automations" | "variables" | "synapse"
}
export const appConfig = {
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
		{ id: "variables", title: "Variables" },
		{
			id: "synapse",
			title: "Entities",
		},
	] satisfies SectionType[],
} as const

export type SectionIds = (typeof appConfig.sections)[number]["id"]
export type SectionTitles = (typeof appConfig.sections)[number]["title"]
