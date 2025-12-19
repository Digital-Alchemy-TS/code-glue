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
	colorDisabled: string // disabled text
	colorOnPrimary: string // text on primary color
	secondaryColor: string // secondary text
	iconInTextColor: string // color for icons within text
	disabledColor: string
	placeholderColor: string
	uiStroke: string
	cardStock: string
	background: string // surface
	switchFalseBackground: string // base "off" color for switches
	switchTrueBackground: string // base "on" color for switches
	normalHover: string
	normalActive: string
	negativeHover: string
	negativeActive: string
	primaryHover: string
	primaryActive: string
	listItemActive: string
	listItemSelected: string
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
	transparent: "rgba(0,0,0,0)",
	slightlyTransparentWhite: "hsla(0, 0%, 100%, 0.93)",
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

export const color = {
	special,
	whiteLike: [special.transparent, special.background],
}

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
			colorDisabled: gray[300],
			colorOnPrimary: special.slightlyTransparentWhite,
			iconInTextColor: gray[500],
			secondaryColor: gray[600],
			disabledColor: gray[500],
			placeholderColor: gray[400],
			uiStroke: gray[100],
			cardStock: special.cardStock,
			background: special.background,
			switchFalseBackground: gray[300],
			switchTrueBackground: green[500],
			normalHover: gray[100],
			normalActive: gray[200],
			negativeHover: red[600],
			negativeActive: red[700],
			primaryHover: blue[600],
			primaryActive: blue[700],
			listItemActive: blue[100],
			listItemSelected: gray[200],
		} as const,
		dark: {
			primary: blue[500],
			destructive: red[500],
			color: gray[900],
			colorDisabled: gray[700],
			colorOnPrimary: special.slightlyTransparentWhite,
			iconInTextColor: gray[500],
			secondaryColor: gray[600],
			disabledColor: gray[300],
			placeholderColor: gray[400],
			uiStroke: gray[100],
			cardStock: special.cardStock,
			background: special.background,
			switchFalseBackground: gray[300],
			switchTrueBackground: green[500],
			normalHover: gray[100],
			normalActive: gray[200],
			negativeHover: red[600],
			negativeActive: red[700],
			primaryHover: blue[600],
			primaryActive: blue[700],
			listItemActive: blue[100],
			listItemSelected: gray[200],
		} as const,
	} as const,
} as const satisfies ParadigmConfigType

export type ParadigmConfig = Partial<Omit<ParadigmConfigType, "themes">> & {
	themes?: Partial<Record<"light" | "dark", Partial<Theme>>>
}
