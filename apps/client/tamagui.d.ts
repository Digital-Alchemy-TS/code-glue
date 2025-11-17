import type { AppConfig } from "./src/design/tamagui.config"

declare module "tamagui" {
	interface TamaguiCustomConfig extends AppConfig {}
}

export type { AppConfig }
