import { resolve } from "node:path"
import { tamaguiPlugin } from "@tamagui/vite-plugin"
import Unfonts from "unplugin-fonts/vite"

import type { PluginOption } from "vite"
import type { ParadigmConfig } from "../config/paradigm.config"

export type FontFamily = {
	name: string
	local?: string
	src: string
}

export type ParadigmViteOptions = {
	config: ParadigmConfig
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
			config: resolve(__dirname, "../config/tamagui.config.ts"),
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
