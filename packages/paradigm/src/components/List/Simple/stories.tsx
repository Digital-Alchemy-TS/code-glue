import preview from "@/storybook/preview"
import { ScrollView } from "../../ScrollView"
import { Text } from "../../Text"
import { Column } from "../../View"
import { SimpleList } from "."

const meta = preview.meta({
	component: SimpleList,
})

export const Empty = meta.story()
export const EmptyWithContent = meta.story({
	args: {
		emptyContent: "I'm So Empty!",
	},
})
export const EmptyWithBeforeAfter = meta.story({
	args: {
		emptyContent: "I'm So Empty!",
		beforeList: <Text>Before</Text>,
		afterList: <Text>After</Text>,
	},
})
export const EmptyWithCustomContent = meta.story({
	args: {
		emptyContent: (
			<Column grow color="red">
				<Text color="white">Custom Empty Content</Text>
			</Column>
		),
	},
})
export const Loading = meta.story({
	args: {
		isLoading: true,
	},
})

export const BeforeAfter = meta.story({
	args: {
		beforeList: <Text>Before Content</Text>,
		afterList: <Text>After Content</Text>,
		children: <Text>Content</Text>,
	},
})

export const Alone = meta.story({
	args: {
		children: (
			<Column grow color="pink">
				<Text fit={Text.fitValues.wrap}>
					This list will grow to fill contents
				</Text>
			</Column>
		),
	},
})

export const InScrollView = meta.story({
	args: {
		children: (
			<Column grow color="pink">
				<Text fit={Text.fitValues.wrap}>
					This list does not grow to fill contents
				</Text>
			</Column>
		),
	},
	render: (args) => {
		return (
			<ScrollView color="cyan">
				<SimpleList {...args} />
			</ScrollView>
		)
	},
})
