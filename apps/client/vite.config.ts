import viteReact from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import viteTsConfigPaths from "vite-tsconfig-paths"

import { paradigmPlugin } from "../../packages/paradigm/src/plugins/vite"

const config = defineConfig({
	base: "./",
	plugins: [
		// this is the plugin that enables path aliases
		viteTsConfigPaths({
			projects: ["./tsconfig.json"],
		}),
		viteReact(),
		paradigmPlugin({
			fontFamilies: [
				{
					name: "Monaspace Argon",
					local: "Monaspace Argon",
					src: "./public/fonts/Monaspace/MonaspaceArgonVar.woff2",
				},
				{
					name: "Monaspace Krypton",
					local: "Monaspace Krypton",
					src: "./public/fonts/Monaspace/MonaspaceKryptonNF-Light.woff2",
				},
			],
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
