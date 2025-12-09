import React from "react"

import preview from "@/storybook/preview"
import { Text } from "../Text"
import { Column, Row } from "../View"
import { Button } from "./index"

const meta = preview.meta({
	component: Button,
})

const ButtonTester = ({
	label,
	button,
}: {
	label: string
	button: React.ReactElement
}) => {
	return (
		<>
			<Text style={typographs.caption}>{label}</Text>
			<Row canWrap noShrink between={4} overflow>
				<Row pb={4} overflow>
					{button}
				</Row>
				<Row pb={4} overflow>
					{React.cloneElement(button, { _hover: true })}
				</Row>

				<Row pb={4} overflow>
					{React.cloneElement(button, { _active: true })}
				</Row>
				<Row pb={4} overflow>
					{React.cloneElement(button, { _hover: true, _active: true })}
				</Row>
				<Row pb={4} overflow>
					{React.cloneElement(button, { isNegative: true })}
				</Row>
				<Row pb={4} overflow>
					{React.cloneElement(button, { isDisabled: true })}
				</Row>
				<Row pb={4} overflow>
					{React.cloneElement(button, { isNegative: true, isDisabled: true })}
				</Row>
				<Row pb={4} overflow>
					{React.cloneElement(button, { isDisabled: true, _hover: true })}
				</Row>
				<Row pb={4} overflow>
					{React.cloneElement(button, { isDisabled: true, _active: true })}
				</Row>
				<Row pb={4} overflow>
					{React.cloneElement(button, {
						isDisabled: true,
						_hover: true,
						_active: true,
					})}
				</Row>
				<Row pb={4} overflow>
					{React.cloneElement(button, {
						isLoading: true,
						_hover: true,
						_active: true,
					})}
				</Row>
				<Row pb={4} overflow>
					{React.cloneElement(button, {
						hasDisclosure: true,
					})}
				</Row>
				<Row pb={4} overflow>
					{React.cloneElement(button, {
						hasDisclosure: true,
						textColorOverride: "purple",
					})}
				</Row>
			</Row>
		</>
	)
}

export const Story = meta.story({
	render: () => (
		<Column overflow>
			<ButtonTester
				label="Label Only"
				button={<Button onPress={() => alert("press")} label="Label Only" />}
			/>
			<ButtonTester
				label="Label and Icon"
				button={
					<Button
						onPress={() => alert("press")}
						icon={Icon.Rain}
						label="Label + Icon"
					/>
				}
			/>
			<ButtonTester
				label="Icon Only"
				button={<Button onPress={() => alert("press")} icon={Icon.Snow} />}
			/>
			<ButtonTester
				label="Primary"
				button={
					<Button
						onPress={() => alert("press")}
						icon={Icon.Trash}
						isPrimary
						label="Primary"
					/>
				}
			/>
			<ButtonTester
				label="Raised"
				button={
					<Button
						onPress={() => alert("press")}
						icon={Icon.WiFi}
						isRaised
						label="Primary + Float"
					/>
				}
			/>
			<ButtonTester
				label="Primary and Raised"
				button={
					<Button
						onPress={() => alert("press")}
						icon={Icon.Timer}
						isPrimary
						isRaised
						label="Primary + Float"
					/>
				}
			/>
		</Column>
	),
})
