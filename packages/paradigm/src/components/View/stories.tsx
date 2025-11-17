import preview from "@/storybook/preview"
import { View } from "./index"

const meta = preview.meta({
	component: View,
})
export const Story = meta.story({
	render: () => <View>View Content</View>,
})
