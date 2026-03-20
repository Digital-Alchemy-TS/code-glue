import { proxy } from "valtio"

import { appConfig } from "@/config"

import type { Themes } from "@code-glue/paradigm"

const defaultTheme = appConfig.themes[0]?.theme
const defaultThemeId =
	defaultTheme === undefined
		? "vs"
		: typeof defaultTheme === "string"
			? defaultTheme
			: defaultTheme.name

const defaults = {
	editor: {
		theme: defaultThemeId,
		typeface: appConfig.editor.defaultFont,
		fontSize: appConfig.editor.defaultFontSize,
		fontWidth: appConfig.editor.defaultFontWidth,
		fontWeight: appConfig.editor.defaultFontWeight,
	},
	console: {
		theme: defaultThemeId,
		typeface: appConfig.logs.defaultFont,
		fontSize: appConfig.logs.defaultFontSize,
		fontWidth: appConfig.logs.defaultFontWidth,
		fontWeight: appConfig.logs.defaultFontWeight,
	},
}

export const settingsStore = proxy({
	appTheme: undefined as Themes | undefined,
	editor: {
		theme: undefined as string | undefined,
		typeface: undefined as string | undefined,
		fontSize: undefined as number | undefined,
		fontWidth: undefined as number | undefined,
		fontWeight: undefined as number | undefined,
	},
	console: {
		theme: undefined as string | undefined,
		typeface: undefined as string | undefined,
		fontSize: undefined as number | undefined,
		fontWidth: undefined as number | undefined,
		fontWeight: undefined as number | undefined,
	},
})

export type SettingsSnapshot = typeof settingsStore
type Section = keyof typeof defaults
type SettingKey = keyof typeof defaults.editor

export const getUserSettingOrDefault = <
	S extends Section,
	K extends SettingKey,
>(
	snap: SettingsSnapshot,
	path: `${S}.${K}`,
): (typeof defaults)[S][K] => {
	const [section, key] = path.split(".") as [S, K]
	return (snap[section][key] ??
		defaults[section][key]) as (typeof defaults)[S][K]
}

export type EditorSettings = typeof settingsStore.editor
