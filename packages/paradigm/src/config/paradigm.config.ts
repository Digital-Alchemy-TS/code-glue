/**
 * The paradigm config is a small selection of variables that a client app can update to customize paradigm.
 * This is then used to create a Tamagui config that drives all the paradigm components.
 */

/**
 * Theme spec. These are the values that will change between light and dark mode.
 */
export type Theme = {
	primary: string
	destructive: string
	color: string // text
	secondaryColor: string // secondary text
	iconInTextColor: string // color for icons within text
	disabledColor: string
	placeholderColor: string
	uiStroke: string
	cardStock: string
	background: string // surface
	switchFalseBackground: string // base "off" color for switches
	switchTrueBackground: string // base "on" color for switches
}

type ParadigmConfigType = {
	size: {
		headerHeight: number
	}
	space: {
		edgeInset: number
		edgeInsetClose: number
	}
	themes: Record<"light" | "dark", Theme>
}

const special = {
	background: "#FFFFFF",
	cardStock: "#F9F9F9",
	surface: "#FFFFFF",
	controlShadow: "rgba(18, 18, 18, 0.06)",
	holeShadow: "rgba(18, 18, 18, 0.24)",
} as const

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
} as const

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
} as const

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
} as const

const red = {
	500: "#EC3F3F",
	600: "#E00C0C",
	700: "#B50707",
	800: "#AC0505",
	900: "#900101",
} as const

const green = {
	500: "#73BE50",
} as const

/**
 * This config outlines all the values that can be changed by an app using paradigm.
 * These values can be overridden via the ParadigmProvider
 * (override code lives in the provider).
 */
export const defaultParadigmConfig = {
	size: {
		headerHeight: 55,
	},
	space: {
		edgeInset: 12,
		edgeInsetClose: 6,
	},
	themes: {
		light: {
			primary: blue[500],
			destructive: red[500],
			color: gray[900],
			iconInTextColor: gray[500],
			secondaryColor: gray[600],
			disabledColor: gold[300],
			placeholderColor: gray[400],
			uiStroke: gray[100],
			cardStock: special.cardStock,
			background: special.background,
			switchFalseBackground: gray[300],
			switchTrueBackground: green[500],
		} as const,
		dark: {
			primary: blue[500],
			destructive: red[500],
			color: gray[900],
			iconInTextColor: gray[500],
			secondaryColor: gray[600],
			disabledColor: gray[300],
			placeholderColor: gray[400],
			uiStroke: gray[100],
			cardStock: special.cardStock,
			background: special.background,
			switchFalseBackground: gray[300],
			switchTrueBackground: green[500],
		} as const,
	} as const,
} as const satisfies ParadigmConfigType

export type ParadigmConfig = Partial<Omit<ParadigmConfigType, "themes">> & {
	themes?: Partial<Record<"light" | "dark", Partial<Theme>>>
}
