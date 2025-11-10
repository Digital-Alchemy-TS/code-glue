import { createTamagui, createTokens } from "tamagui"

import { Nuntito, NuntitoBold } from "./fonts"

const tokens = createTokens({
	color: {},
	space: {
		sm: 2,
		true: 2,
	},
	size: {
		sm: 2,
		true: 2,
	},
	radius: {
		sm: 2,
		true: 2,
	},
	zIndex: {
		sm: 2,
		true: 2,
	},
})

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

type Theme = {
	primary: string
	destructive: string
	text: string
	secondaryText: string
	disabledText: string
	UIStroke: string
	CardStock: string
	Surface: string
	ControlShadow: string
	HoleShadow: string
}

export const tamaguiConfig = createTamagui({
	settings: {
		allowedStyleValues: "strict",
	},
	shouldAddPrefersColorThemes: true,
	themeClassNameOnRoot: true,
	shorthands: {},
	fonts: {
		heading: NuntitoBold,
		body: Nuntito,
	},
	tokens,
	themes: {
		light: {
			primary: blue[500],
			destructive: red[500],
			text: gray[900],
			secondaryText: gray[600],
			disabledText: gray[300],
			UIStroke: gray[100],
			CardStock: "#F9F9F9",
			Surface: "FFFFFF",
			ControlShadow: "rgba(18, 18, 18, 0.06)",
			HoleShadow: "rgba(18, 18, 18, 0.24)",
		} as Theme,
	},
	media: {
		xs: { maxWidth: 660 },
		sm: { maxWidth: 800 },
		md: { maxWidth: 1020 },
		lg: { maxWidth: 1280 },
		xl: { maxWidth: 1420 },
		xxl: { maxWidth: 1600 },
		gtXs: { minWidth: 660 + 1 },
		gtSm: { minWidth: 800 + 1 },
		gtMd: { minWidth: 1020 + 1 },
		gtLg: { minWidth: 1280 + 1 },
		short: { maxHeight: 820 },
		tall: { minHeight: 820 },
		hoverNone: { hover: "none" },
		pointerCoarse: { pointer: "coarse" },
	},
})

export type AppConfig = typeof tamaguiConfig

declare module "tamagui" {
	interface TamaguiCustomConfig extends AppConfig {}
}

export default tamaguiConfig
