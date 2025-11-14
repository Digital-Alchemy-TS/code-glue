import { createTamagui } from "tamagui"

import { paradigmConfig } from "@code-glue/paradigm"
import { Nuntito, NuntitoBold } from "./fonts"

export const tamaguiConfig = createTamagui({
	...paradigmConfig,
	fonts: {
		heading: NuntitoBold,
		body: Nuntito,
	},
})

export type AppConfig = typeof tamaguiConfig

declare module "tamagui" {
	interface TamaguiCustomConfig extends AppConfig {}
}

export default tamaguiConfig
