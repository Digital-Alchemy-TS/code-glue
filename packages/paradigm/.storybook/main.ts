import { defineMain } from "@storybook/react-vite/node"
import { tamaguiPlugin } from "@tamagui/vite-plugin"
import viteTsConfigPaths from "vite-tsconfig-paths"
export default defineMain({
	framework: "@storybook/react-vite",
	stories: [
		"../src/**/*.mdx",
		"../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
		"../src/**/stories.@(js|jsx|mjs|ts|tsx)",
	],
	addons: [
		"@chromatic-com/storybook",
		"@storybook/addon-docs",
		"@storybook/addon-a11y",
		"@storybook/addon-vitest",
	],
	core: {
		builder: "@storybook/builder-vite",
	},
	async viteFinal(config) {
		const { mergeConfig } = await import("vite")

		return mergeConfig(config, {
			plugins: [
				viteTsConfigPaths({
					projects: ["./tsconfig.json"],
				}),
				tamaguiPlugin({
					config: "./src/config/tamagui.config.ts",
					components: ["tamagui"],
					optimize: true,
				}),
			],
		})
	},
})
