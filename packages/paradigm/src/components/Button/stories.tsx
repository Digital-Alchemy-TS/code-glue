import React from "react"

import preview from "@/storybook/preview"
import { Icon } from "../Icon"
import { Text } from "../Text"
import { Column, Row, type ViewProps } from "../View"
import { Button } from "./index"

const meta = preview.meta({
	component: Button,
})

type ButtonElement = React.ReactElement<React.ComponentProps<typeof Button>>

type ButtonSize = React.ComponentProps<typeof Button>["size"]

const buildButtonsForSize = (size: ButtonSize) => [
	{
		label: "Label Only",
		button: (
			<Button onPress={() => alert("press")} label="Label Only" size={size} />
		),
	},
	{
		label: "Label and Icon",
		button: (
			<Button
				onPress={() => alert("press")}
				icon={Icon.Rain}
				label="Label + Icon"
				size={size}
			/>
		),
	},
	{
		label: "Icon Only",
		button: (
			<Button onPress={() => alert("press")} icon={Icon.Snow} size={size} />
		),
	},
	{
		label: "Primary",
		button: (
			<Button
				onPress={() => alert("press")}
				icon={Icon.Trash}
				isPrimary
				label="Primary"
				size={size}
			/>
		),
	},
	{
		label: "Raised",
		button: (
			<Button
				onPress={() => alert("press")}
				icon={Icon.WiFi}
				isRaised
				label="Primary"
				size={size}
			/>
		),
	},
	{
		label: "Raised on non-white background",
		background: "$cardStock" as ViewProps["color"],
		button: (
			<Button
				onPress={() => alert("press")}
				icon={Icon.WiFi}
				isRaised
				label="Primary"
				size={size}
			/>
		),
	},
	{
		label: "Primary and Raised",
		button: (
			<Button
				onPress={() => alert("press")}
				icon={Icon.Timer}
				isPrimary
				isRaised
				label="Primary + Raised"
				size={size}
			/>
		),
	},
	{
		label: "Icon Only and Raised",
		button: (
			<Button
				onPress={() => alert("press")}
				icon={Icon.Snow}
				isRaised
				size={size}
			/>
		),
	},
]

const ButtonTester = ({
	label,
	button,
	backgroundColor,
}: {
	label: string
	button: ButtonElement
	backgroundColor?: ViewProps["color"]
}) => {
	return (
		<Column color={backgroundColor}>
			<Text style={Text.style.caption}>{label}</Text>
			<Row canWrap noShrink between={4} color={backgroundColor}>
				<Row pb={4}>{button}</Row>
				<Row pb={4}>{React.cloneElement(button, { isNegative: true })}</Row>
				<Row pb={4}>{React.cloneElement(button, { isDisabled: true })}</Row>
				<Row pb={4}>
					{React.cloneElement(button, { isNegative: true, isDisabled: true })}
				</Row>
				<Row pb={4}>
					{React.cloneElement(button, {
						isLoading: true,
					})}
				</Row>
				<Row pb={4}>
					{React.cloneElement(button, {
						hasDisclosure: true,
					})}
				</Row>
			</Row>
		</Column>
	)
}

export const Story = meta.story({
	args: {
		icon: Icon.Snow,
		label: "Button",
		size: "medium",
	},
	render: (args) => (
		<Row center m={20}>
			<Button {...args} />
		</Row>
	),
})
export const AllMediumButtons = meta.story({
	render: () => (
		<Column>
			{buildButtonsForSize("medium").map(({ label, button, background }) => (
				<ButtonTester
					key={`${label}-medium`}
					label={label}
					button={button}
					backgroundColor={background}
				/>
			))}
		</Column>
	),
})

export const AllSmallButtons = meta.story({
	render: () => (
		<Column>
			{buildButtonsForSize("small").map(({ label, button, background }) => (
				<ButtonTester
					key={`${label}-small`}
					label={label}
					button={button}
					backgroundColor={background}
				/>
			))}
		</Column>
	),
})
