import { defaultConfig } from "@tamagui/config/v4"
import { type CreateTamaguiProps, createTamagui, createTokens } from "tamagui"

import { Nuntito } from "./fonts"
import { baseConfig } from "./paradigm.config"
import { shorthands } from "./shorthands"

const tokens = createTokens({
	color: {},
	size: {
		...baseConfig.sizes,
		true: 1,
		stroke: 1,
		thinStroke: 0.5,
		input: 32,
	},
	space: {
		space: 16,
		true: 16,
		edgeInset: 12,
		edgeInsetClose: 6,
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

export const paradigmConfig = {
	...defaultConfig,
	settings: {
		...defaultConfig.settings,
		styleCompat: "react-native",
	},
	fonts: {
		heading: Nuntito,
		body: Nuntito,
	},
	shorthands,
	tokens,
	themes: baseConfig.themes,
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
	} as const,
} satisfies CreateTamaguiProps

const tamaguiConfig = createTamagui(paradigmConfig)

export type AppConfig = typeof tamaguiConfig

declare module "tamagui" {
	interface TamaguiCustomConfig extends AppConfig {}
}

export default tamaguiConfig
