import { useSnapshot } from "valtio/react"

import { ScrollView, SettingsList } from "@code-glue/paradigm"
import { appConfig } from "@/config"
import { settingsStore } from "@/store/settings"

import type { AppearanceMode, EditorSettings } from "@/store/settings"

const APPEARANCE_OPTIONS = [
	{ label: "System", value: "system" },
	{ label: "Light", value: "light" },
	{ label: "Dark", value: "dark" },
]

type EditorSettingsGroupProps = {
	title: string
	settings: EditorSettings
	onThemeChange: (value: string) => void
	onTypefaceChange: (value: string) => void
	onFontSizeChange: (value: number) => void
	onFontWidthChange: (value: number) => void
	onFontWeightChange: (value: number) => void
}

const EditorSettingsGroup = ({
	title,
	settings,
	onThemeChange,
	onTypefaceChange,
	onFontSizeChange,
	onFontWidthChange,
	onFontWeightChange,
}: EditorSettingsGroupProps) => (
	<SettingsList header={title}>
		<SettingsList.Select
			label="Theme"
			options={appConfig.editor.themes.map((theme) => ({
				label: theme.name,
				value: typeof theme.theme === "string" ? theme.theme : theme.theme.name,
			}))}
			value={settings.theme}
			onValueChange={onThemeChange}
		/>
		<SettingsList.Select
			label="Typeface"
			options={appConfig.fontFamilies.map((font) => ({
				label: font.name,
				value: font.name,
			}))}
			value={settings.typeface}
			onValueChange={onTypefaceChange}
		/>
		<SettingsList.Slider
			label="Font Size"
			min={8}
			max={40}
			value={settings.fontSize}
			onValueChange={onFontSizeChange}
		/>
		<SettingsList.Slider
			label="Width"
			min={100}
			max={125}
			value={settings.fontWidth}
			onValueChange={onFontWidthChange}
		/>
		<SettingsList.Slider
			label="Weight"
			min={200}
			max={800}
			value={settings.fontWeight}
			onValueChange={onFontWeightChange}
		/>
	</SettingsList>
)

export const Settings = () => {
	const settings = useSnapshot(settingsStore)

	return (
		<ScrollView>
			<SettingsList header="Theme">
				<SettingsList.Select
					label="Mode"
					options={APPEARANCE_OPTIONS}
					value={settings.appearance}
					onValueChange={(value) => {
						settingsStore.appearance = value as AppearanceMode
					}}
				/>
			</SettingsList>

			<EditorSettingsGroup
				title="Editor Settings"
				settings={settings.editor}
				onThemeChange={(value) => {
					settingsStore.editor.theme = value
				}}
				onTypefaceChange={(value) => {
					settingsStore.editor.typeface = value
				}}
				onFontSizeChange={(value) => {
					settingsStore.editor.fontSize = value
				}}
				onFontWidthChange={(value) => {
					settingsStore.editor.fontWidth = value
				}}
				onFontWeightChange={(value) => {
					settingsStore.editor.fontWeight = value
				}}
			/>

			<EditorSettingsGroup
				title="Log Settings"
				settings={settings.console}
				onThemeChange={(value) => {
					settingsStore.console.theme = value
				}}
				onTypefaceChange={(value) => {
					settingsStore.console.typeface = value
				}}
				onFontSizeChange={(value) => {
					settingsStore.console.fontSize = value
				}}
				onFontWidthChange={(value) => {
					settingsStore.console.fontWidth = value
				}}
				onFontWeightChange={(value) => {
					settingsStore.console.fontWeight = value
				}}
			/>
		</ScrollView>
	)
}
