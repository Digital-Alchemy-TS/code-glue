/**
 * Theme spec. These are the values that will change between light and dark mode.
 */
export type Theme = {
	primary: string
	destructive: string
	color: string // text
	secondaryColor: string // secondary text
	disabledColor: string
	placeholderColor: string
	borderColor: string // ui stroke
	cardStock: string
	background: string // surface
	controlShadow: string
	holeShadow: string
}

const special = {
	background: "#FFFFFF",
	cardStock: "#F9F9F9",
	surface: "#FFFFFF",
	controlShadow: "rgba(18, 18, 18, 0.06)",
	holeShadow: "rgba(18, 18, 18, 0.24)",
}

const gray = {
	100: "#E9EBED",
	200: "#D0D2D4",
	300: "#C1C3C6",
	400: "#B2B4B9",
	500: "#9A9EA5",
	600: "#777D86",
	700: "#5B5D62",
	800: "#373B3F",
	900: "#24292D",
	1000: "#121212",
}

const blue = {
	100: "#CAD8EE",
	200: "#B4CAEF",
	300: "#73A3F2",
	400: "#5A96F1",
	500: "#367FEE",
	600: "#1361D8",
	700: "#0F4BA8",
	800: "#0C3B83",
	900: "#092C63",
}

const gold = {
	100: "#F1EBD4",
	200: "#F5E4A3",
	300: "#F7E087",
	400: "#F5D663",
	500: "#FDD230",
	600: "#F1CA30",
	700: "#EBC01F",
	800: "#D9B52A",
	900: "#897226",
}

const red = {
	500: "#EC3F3F",
	600: "#E00C0C",
	700: "#B50707",
	800: "#AC0505",
	900: "#900101",
}

export const baseConfig = {
	sizes: {
		headerHeight: 55,
	},
	themes: {
		light: {
			primary: blue[500],
			destructive: red[500],
			color: gray[900],
			secondaryColor: gray[600],
			disabledColor: gold[300],
			placeholderColor: gray[400],
			borderColor: gray[100],
			cardStock: special.cardStock,
			background: special.background,
			controlShadow: special.controlShadow,
			holeShadow: special.holeShadow,
		} satisfies Theme,
	},
}

export type ParadigmConfig = typeof baseConfig

export const createParadigmConfig = (
	overrides: Partial<ParadigmConfig> = {},
) => {
	return {
		...baseConfig,
		...overrides,
	}
}
