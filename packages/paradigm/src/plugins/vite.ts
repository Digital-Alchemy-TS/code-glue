import { resolve } from "node:path"
import { tamaguiPlugin } from "@tamagui/vite-plugin"
import Unfonts from "unplugin-fonts/vite"

import type { PluginOption } from "vite"

export type FontFamily = {
	name: string
	local?: string
	src: string
}

export type ParadigmViteOptions = {
	fontFamilies?: FontFamily[]
}

export function paradigmPlugin({
	fontFamilies: families = [],
}: ParadigmViteOptions): PluginOption {
	return [
		tamaguiPlugin({
			config: resolve(__dirname, "../config/tamagui.config.ts"),
			components: ["tamagui"],
			optimize: true,
		}),
		Unfonts({
			fontsource: {
				families: [
					{
						name: "Nunito Sans",
						weights: [600, 800],
						styles: ["normal"],
					},
				],
			},
			custom: {
				preload: true,
				families,
			},
		}),
	]
}
