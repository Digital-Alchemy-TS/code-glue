import preview from "../../../.storybook/preview"
import { Icon } from "../Icon"
import { Button } from "./"
import { ButtonRow } from "./ButtonRow"

const meta = preview.meta({
	component: ButtonRow,
})

export const Default = meta.story({
	render: () => (
		<ButtonRow>
			<Button icon={Icon.EmojiSymbol} isRaised />
			<Button icon={Icon.EmojiNature} isRaised />
		</ButtonRow>
	),
})
