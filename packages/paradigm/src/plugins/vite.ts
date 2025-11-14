import { tamaguiPlugin } from "@tamagui/vite-plugin"
import Unfonts from "unplugin-fonts/vite"

import type { PluginOption } from "vite"

export type FontFamily = {
	name: string
	local?: string
	src: string
}

export type ParadigmViteOptions = {
	config: string
	fontFamilies: FontFamily[]
}

console.log("Loading paradigm vite plugin")

export function paradigmPlugin({
	config,
	fontFamilies: families,
}: ParadigmViteOptions): PluginOption {
	if (!config) {
		throw new Error('paradigmPlugin: "config" is required')
	}

	return [
		tamaguiPlugin({
			config,
			components: ["tamagui"],
			optimize: true,
		}),
		Unfonts({
			custom: {
				preload: true,
				families,
			},
		}),
	]
}
