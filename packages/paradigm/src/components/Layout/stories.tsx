import preview from "@/storybook/preview"
import { Text } from "../Text"
import { View } from "../View"
import { Layout } from "."

const meta = preview.meta({
	component: Layout,
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

export const HorizontalNav = meta.story({
	render: () => (
		<View fillContainer>
			<Layout.HorizontalNav nav={<Nav />} content={<Content />} />
		</View>
	),
})

export const VerticalNav = meta.story({
	render: () => (
		<View fillContainer>
			<Layout.VerticalNav nav={<Nav />} content={<Content />} />
		</View>
	),
})
