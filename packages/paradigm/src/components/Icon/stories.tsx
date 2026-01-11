import preview from "@/storybook/preview"
import { Center, Row, View } from "../View"
import { rawIcons } from "./generated"
import { Icon } from "./index"

const meta = preview.meta({
	component: Icon,
	args: {
		color: "red",
	},
})
export const Generated = meta.story({
	render: (args) => (
		<Row canWrap>
			{Object.entries(rawIcons).map(([name, IconComponent]) => (
				<IconComponent color={args.color} size={24} key={name} />
			))}
		</Row>
	),
})

export const DragHandle = meta.story({
	render: (args) => (
		<Center between={20}>
			<Icon.DragHandle color={args.color} />
			<Icon.DragHandle color={args.color} horizontal />
			<View borderWidth={1}>
				<Icon.DragHandle color={args.color} />
			</View>
			<View borderWidth={1}>
				<Icon.DragHandle color={args.color} horizontal />
			</View>
		</Center>
	),
})
