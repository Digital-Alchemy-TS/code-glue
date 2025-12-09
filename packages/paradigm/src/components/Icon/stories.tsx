import preview from "@/storybook/preview"
import { Row } from "../View"
import { rawIcons } from "./generated"
import { Icon } from "./index"

const meta = preview.meta({
	component: Icon,
})
export const Story = meta.story({
	render: () => (
		<Row canWrap>
			{Object.entries(rawIcons).map(([name, IconComponent]) => (
				<IconComponent color="red" size={24} key={name} />
			))}
		</Row>
	),
})
