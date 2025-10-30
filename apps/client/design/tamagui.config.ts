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
			background: "#fff",
			color: "#000",
		},
		dark: {
			background: "#000",
			color: "#fff",
		},
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
