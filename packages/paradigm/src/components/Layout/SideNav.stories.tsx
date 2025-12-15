import preview from "@/storybook/preview"
import { Text } from "../Text"
import { View } from "../View"
import { SideNav } from "./SideNav"

const meta = preview.meta({
	component: SideNav,
	argTypes: {
		nav: { control: false },
		content: { control: false },
	},
})

const Nav = () => (
	<View grow center color={"$cardStock"}>
		<Text>Nav</Text>
	</View>
)
const Content = () => (
	<View grow center>
		<Text>Content</Text>
	</View>
)

export const Default = meta.story({
	args: {
		nav: <Nav />,
		content: <Content />,
	},
})
