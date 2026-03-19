import { useSnapshot } from "valtio/react"

import { ScrollView, SettingsList, Themes } from "@code-glue/paradigm"
import { appConfig } from "@/config"
import { getUserSettingOrDefault, settingsStore } from "@/store/settings"

const AppThemeOptions = [
	{ label: "System", value: Themes.system },
	{ label: "Light", value: Themes.light },
	{ label: "Dark", value: Themes.dark },
]

export const Settings = () => {
	const snap = useSnapshot(settingsStore)

	return (
		<ScrollView>
			<SettingsList header="App">
				<SettingsList.Select
					label="Theme"
					options={AppThemeOptions}
					value={snap.appTheme ?? Themes.system}
					onValueChange={(value) => {
						settingsStore.appTheme = value
					}}
				/>
			</SettingsList>

			<SettingsList header="Editor Settings">
				<SettingsList.Select
					label="Theme"
					options={appConfig.themes.map((theme) => ({
						label: theme.name,
						value:
							typeof theme.theme === "string" ? theme.theme : theme.theme.name,
					}))}
					value={getUserSettingOrDefault(snap, "editor.theme")}
					onValueChange={(value) => {
						settingsStore.editor.theme = value
					}}
				/>
				<SettingsList.Select
					label="Typeface"
					options={appConfig.fontFamilies.map((font) => ({
						label: font.name,
						value: font.name,
					}))}
					value={getUserSettingOrDefault(snap, "editor.typeface")}
					onValueChange={(value) => {
						settingsStore.editor.typeface = value
					}}
				/>
				<SettingsList.Slider
					label="Font Size"
					min={8}
					max={40}
					value={getUserSettingOrDefault(snap, "editor.fontSize")}
					onValueChange={(value) => {
						settingsStore.editor.fontSize = value
					}}
				/>
				<SettingsList.Slider
					label="Width"
					min={100}
					max={125}
					value={getUserSettingOrDefault(snap, "editor.fontWidth")}
					onValueChange={(value) => {
						settingsStore.editor.fontWidth = value
					}}
				/>
				<SettingsList.Slider
					label="Weight"
					min={200}
					max={800}
					value={getUserSettingOrDefault(snap, "editor.fontWeight")}
					onValueChange={(value) => {
						settingsStore.editor.fontWeight = value
					}}
				/>
			</SettingsList>

			<SettingsList header="Log Settings">
				<SettingsList.Select
					label="Theme"
					options={appConfig.themes.map((theme) => ({
						label: theme.name,
						value:
							typeof theme.theme === "string" ? theme.theme : theme.theme.name,
					}))}
					value={getUserSettingOrDefault(snap, "console.theme")}
					onValueChange={(value: string) => {
						settingsStore.console.theme = value
					}}
				/>
				<SettingsList.Select
					label="Typeface"
					options={appConfig.fontFamilies.map((font) => ({
						label: font.name,
						value: font.name,
					}))}
					value={getUserSettingOrDefault(snap, "console.typeface")}
					onValueChange={(value) => {
						settingsStore.console.typeface = value
					}}
				/>
				<SettingsList.Slider
					label="Font Size"
					min={8}
					max={40}
					value={getUserSettingOrDefault(snap, "console.fontSize")}
					onValueChange={(value) => {
						settingsStore.console.fontSize = value
					}}
				/>
				<SettingsList.Slider
					label="Width"
					min={100}
					max={125}
					value={getUserSettingOrDefault(snap, "console.fontWidth")}
					onValueChange={(value) => {
						settingsStore.console.fontWidth = value
					}}
				/>
				<SettingsList.Slider
					label="Weight"
					min={200}
					max={800}
					value={getUserSettingOrDefault(snap, "console.fontWeight")}
					onValueChange={(value) => {
						settingsStore.console.fontWeight = value
					}}
				/>
			</SettingsList>
		</ScrollView>
	)
}
