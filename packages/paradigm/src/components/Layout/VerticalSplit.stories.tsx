import preview from "@/storybook/preview"
import { Text } from "../Text"
import { View } from "../View"
import { VerticalSplit } from "./VerticalSplit"

const meta = preview.meta({
	component: VerticalSplit,
	argTypes: {
		top: { control: false },
		bottom: { control: false },
	},
})

const Top = () => (
	<View grow center color={"$cardStock"}>
		<Text>Top</Text>
	</View>
)
const Bottom = () => (
	<View grow center>
		<Text>Bottom</Text>
	</View>
)

export const Default = meta.story({
	args: {
		top: <Top />,
		bottom: <Bottom />,
	},
})

export const Collapsible = meta.story({
	args: {
		top: <Top />,
		bottom: <Bottom />,
		defaultCollapsed: true,
		collapsible: true,
		collapsedSize: 40,
		min: 200,
		max: 400,
	},
})
