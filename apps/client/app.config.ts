type SectionType = {
	title: string
	id: "automations" | "variables" | "synapse"
}
export const appConfig = {
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
