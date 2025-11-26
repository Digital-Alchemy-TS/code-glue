import viteReact from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import viteTsConfigPaths from "vite-tsconfig-paths"

import { paradigmPlugin } from "../../packages/paradigm/src/plugins/vite"

const config = defineConfig({
	plugins: [
		// this is the plugin that enables path aliases
		viteTsConfigPaths({
			projects: ["./tsconfig.json"],
		}),
		viteReact(),
		paradigmPlugin({
			config: "./src/design/tamagui.config.ts",
			fontFamilies: [
				{
					name: "Nunito Sans",
					local: "Nunito Sans",
					src: "./public/fonts/NunitoSans/NunitoSans.ttf",
				},
				{
					name: "Monaspace Argon",
					local: "Monaspace Argon",
					src: "./public/fonts/Monaspace/Monaspace Argon/Monaspace Argon Var.woff2",
				},
				{
					name: "Monaspace Krypton",
					local: "Monaspace Krypton",
					src: "./public/fonts/Monaspace/Monaspace Krypton/Monaspace Krypton Var.woff2",
				},
				{
					name: "Monaspace Neon",
					local: "Monaspace Neon",
					src: "./public/fonts/Monaspace/Monaspace Neon/Monaspace Neon Var.woff2",
				},
				{
					name: "Monaspace Xenon",
					local: "Monaspace Xenon",
					src: "./public/fonts/Monaspace/Monaspace Xenon/Monaspace Xenon Var.woff2",
				},
				{
					name: "Monaspace Radon",
					local: "Monaspace Radon",
					src: "./public/fonts/Monaspace/Monaspace Radon/Monaspace Radon Var.woff2",
				},
			],
		}),
	],
})
export default config
