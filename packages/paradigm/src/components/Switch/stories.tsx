import React from "react"

import preview from "@/storybook/preview"
import { Column } from "../View"
import { Switch } from "./index"

const meta = preview.meta({
	component: Switch,
})

const ControlledSwitch: React.FC<{
	initialValue: boolean
	isDisabled?: boolean
}> = ({ initialValue, isDisabled }) => {
	const [value, setValue] = React.useState(initialValue)

	return (
		<Switch value={value} onValueChange={setValue} isDisabled={isDisabled} />
	)
}

export const Story = meta.story({
	render: () => (
		<Column grow center>
			<ControlledSwitch initialValue={true} />
			<ControlledSwitch initialValue={false} />
			<ControlledSwitch initialValue={true} isDisabled />
			<ControlledSwitch initialValue={false} isDisabled />
		</Column>
	),
})
