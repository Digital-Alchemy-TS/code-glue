import { tamaguiPlugin } from "@tamagui/vite-plugin"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import Unfonts from "unplugin-fonts/vite"
import { defineConfig } from "vite"
import viteTsConfigPaths from "vite-tsconfig-paths"

const config = defineConfig({
	plugins: [
		// this is the plugin that enables path aliases
		viteTsConfigPaths({
			projects: ["./tsconfig.json"],
		}),
		tanstackStart(),
		viteReact(),
		tamaguiPlugin({
			config: "./design/tamagui.config.ts",
			components: ["tamagui"],
			optimize: true,
		}),
		Unfonts({
			custom: {
				preload: true,
				families: [
					{
						name: "Nunito Sans",
						local: "Nunito Sans",
						src: "./public/fonts/NunitoSans.ttf",
					},
					{
						name: "Anonymous Pro",
						local: "Anonymous Pro",
						src: "./public/fonts/AnonymousPro-Regular.ttf",
					},
					{
						name: "Space Mono",
						local: "Space Mono",
						src: "./public/fonts/SpaceMono-Regular.ttf",
					},
				],
			},
		}),
	],
})

export default config
