import { createFont } from "tamagui"

export enum FontKey {
	largeTitle = "$largeTitle",
	title1 = "$title1",
	title2 = "$title2",
	title3 = "$title3",
	headline = "$headline",
	body = "$body",
	subhead = "$subhead",
	footnote = "$footnote",
	caption = "$caption",
}

type FontFamilies<T> = Record<keyof typeof FontKey, T>

export const Nuntito = createFont({
	family: '"Nunito Sans"',
	weight: {
		largeTitle: "900",
		title1: "700",
		title2: "700",
		title3: "700",
		headline: "900",
		body: "700",
		subhead: "700",
		footnote: "700",
		caption: "700",
	} satisfies FontFamilies<string>,
	size: {
		largeTitle: 30,
		title1: 24,
		title2: 20,
		title3: 18,
		headline: 18,
		body: 18,
		subhead: 16,
		footnote: 14,
		caption: 12,
	} satisfies FontFamilies<number>,
})
