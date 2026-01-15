import preview from "@/storybook/preview"
import { Text } from "../Text"
import { Column } from "../View"
import { VerticalSplitWithTabPanel } from "./VerticalContentWithTabPanel"

const meta = preview.meta({
	component: VerticalSplitWithTabPanel,
})

const Content = () => {
	return (
		<Column color="green" grow center>
			<Text>Content</Text>
		</Column>
	)
}

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
		content: <Content />,
		tabs: [
			{ label: "Tab A", content: <TabA /> },
			{ label: "Tab B", content: <TabB /> },
		],
	},
})
