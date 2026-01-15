import preview from "@/storybook/preview"
import { Text } from "../Text"
import { Column } from "../View"
import { TabPanel } from "./TabPanel"

const meta = preview.meta({
	component: TabPanel,
})

const TabA = () => {
	return (
		<Column color="blue" grow center>
			<Text>Tab A</Text>
		</Column>
	)
}

const TabB = () => {
	return (
		<Column color="red" grow center>
			<Text>Tab B</Text>
		</Column>
	)
}

export const Default = meta.story({
	args: {
		tabs: [
			{ label: "Tab A", content: <TabA /> },
			{ label: "Tab B", content: <TabB /> },
		],
	},
})
