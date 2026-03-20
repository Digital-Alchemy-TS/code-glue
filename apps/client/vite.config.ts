import viteReact from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import viteTsConfigPaths from "vite-tsconfig-paths"

import { paradigmPlugin } from "../../packages/paradigm/src/plugins/vite"
import { appConfig } from "./app.config"

const config = defineConfig({
	base: "./",
	plugins: [
		// this is the plugin that enables path aliases
		viteTsConfigPaths({
			projects: ["./tsconfig.json"],
		}),
		viteReact(),
		paradigmPlugin({
			fontFamilies: appConfig.fontFamilies,
		}),
	],
	build: {
		commonjsOptions: {
			transformMixedEsModules: true,
		},
	},
	optimizeDeps: {
		esbuildOptions: {
			define: {
				global: "globalThis",
			},
		},
	},
})
export default config
