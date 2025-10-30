// import { tamaguiPlugin } from "@tamagui/vite-plugin"
import { tamaguiPlugin } from "@tamagui/vite-plugin"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
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
			// points to your tamagui config file
			config: "./design/tamagui.config.ts",
			// points to any linked packages or node_modules
			// that have tamagui components to optimize
			components: ["tamagui"],
			// turns on the optimizing compiler
			optimize: true,
		}),
	],
})

export default config
