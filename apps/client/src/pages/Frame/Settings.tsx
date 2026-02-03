import { Column, Text } from "@code-glue/paradigm"

export const Settings = () => {
	return (
		<Column>
			<Text>Settings</Text>
			<Text> Appearance (Dark/light/system) dropdown</Text>
			<Text>------</Text>
			<Text>Editor Theme (dropdown)</Text>
			<Text>Typeface (dropdown)</Text>
			<Text>Font Size (slider)</Text>
			<Text>Width (slider)</Text>
			<Text>Weight (slider)</Text>
			<Text>------</Text>
			<Text>Console Theme (dropdown)</Text>
			<Text>Typeface (dropdown)</Text>
			<Text>Font Size (slider)</Text>
			<Text>Width (slider)</Text>
			<Text>Weight (slider)</Text>
		</Column>
	)
}
