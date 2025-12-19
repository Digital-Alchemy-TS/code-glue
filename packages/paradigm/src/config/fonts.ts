import { createFont } from "tamagui"

export enum FontKey {
	header1 = "$header1",
	header2 = "$header2",
	header3 = "$header3",
	header4 = "$header4",
	header5 = "$header5",
	header6 = "$header6",
	body = "$body",
	footnote = "$footnote",
	caption = "$caption",
}

type FontFamilies<T> = Record<keyof typeof FontKey, T>

export const Nuntito = createFont({
	family: '"Nunito Sans"',
	weight: {
		header1: "800",
		header2: "700",
		header3: "600",
		header4: "500",
		header5: "400",
		header6: "800",
		body: "400",
		footnote: "600",
		caption: "600",
	} satisfies FontFamilies<string>,
	size: {
		header1: 30,
		header2: 24,
		header3: 20,
		header4: 16,
		header5: 16,
		header6: 16,
		body: 16,
		footnote: 14,
		caption: 12,
	} satisfies FontFamilies<number>,
})
