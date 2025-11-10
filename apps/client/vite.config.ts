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
			config: "./src/design/tamagui.config.ts",
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
			},
		}),
	],
})

export default config
