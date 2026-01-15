import { defaultConfig as defaultTamaguiConfig } from "@tamagui/config/v4"
import { type CreateTamaguiProps, createTamagui, createTokens } from "tamagui"

import { Nuntito } from "./fonts"
import { defaultParadigmConfig } from "./paradigm.config"
import { shorthands } from "./shorthands"

export const baseTokens = {
	color: {},
	size: {
		...defaultParadigmConfig.size,
		true: 16,
		input: 32,
		tabHeight: 40,
		tabContentMinHeight: 40,
		tabContentDefaultSize: 280,
		listHeaderHeight: 45,
		listHeaderHeightSticky: 32,
		listItemStatusSize: 4,
		listItemAfterIconSize: 18,
		listItemFirstLineIconSize: 14,
		listItemInteriorIconSize: 16,
		listItemHeight: 32,
		mainNavMinWidth: 280,
		mainNavMaxWidth: 560,
	},
	space: {
		...defaultParadigmConfig.space,
		thinStroke: 1,
		space: 16,
		true: 16,
		betweenLists: 16,
		betweenButtons: 6,
		listItemEdgeInset: 6,
		listItemBetweenItems: 4,
		listItemStatusPosition: 6,
		listItemTextIconSpace: 6,
	},
	radius: {
		sm: 2,
		true: 2,
		md: 6,
		circle: 400,
	},
	zIndex: {
		below: -1,
		0: 0,
		1: 100,
		true: 100,
		2: 200,
		3: 300,
		4: 400,
		5: 500,
	},
} as const

/**
 * This is the config used in paradigm by default.
 * It is possible to override values via the ParadigmProvider.
 */
export const baseConfig = {
	...defaultTamaguiConfig,
	settings: {
		...defaultTamaguiConfig.settings,
		styleCompat: "react-native",
	},
	tokens: createTokens(baseTokens),
	fonts: {
		heading: Nuntito,
		body: Nuntito,
	},
	shorthands,
	themes: defaultParadigmConfig.themes,
	media: {
		narrow: { maxWidth: 592 },
		wide: { minWith: 592 + 1 },
	} as const,
} satisfies CreateTamaguiProps

const baseTamagui = createTamagui(baseConfig)

export type AppConfig = typeof baseTamagui

declare module "tamagui" {
	interface TamaguiCustomConfig extends AppConfig {}
}
