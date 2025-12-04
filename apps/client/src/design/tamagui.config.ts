import { createTamagui } from "tamagui"

import { paradigmConfig } from "@code-glue/paradigm"
import { MonaspaceArgon, MonaspaceKrypton, Nuntito, NuntitoBold } from "./fonts"

export const tamaguiConfig = createTamagui({
	...paradigmConfig,
	fonts: {
		heading: NuntitoBold,
		body: Nuntito,
		code: MonaspaceArgon,
		terminal: MonaspaceKrypton,
	},
})
export default tamaguiConfig
