import { defineConfig } from "tsup"

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["esm"],
	dts: true,
	sourcemap: true,
	clean: true,
	external: [
		"react",
		"react-dom",
		"vite",
		"lightningcss",
		"@tamagui/vite-plugin",
		"unplugin-fonts",
		"tamagui",
		"@tamagui/config",
		"@tamagui/config/v4",
	],
})
