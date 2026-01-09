import React from "react"
import { useTheme } from "tamagui"

import preview from "@/storybook/preview"
import { type ShadowName, shadowStyles } from "../../generated/shadows"
import { useShadow } from "../../hooks/useShadow"
import { Text } from "../Text"
import {
	Column,
	MotionView,
	Row,
	View,
	ViewContext,
	type ViewProps,
} from "./index"

const meta = preview.meta({
	component: View,
})

const TestBox = (props: ViewProps) => {
	const theme = useTheme()
	return (
		<View
			{...props}
			width={100}
			height={100}
			radius={5}
			color={theme.cardStock}
		/>
	)
}

const TestHover = () => {
	const theme = useTheme()
	const { all: e1 } = useShadow({
		shadowName: "elevation1",
		forceBoxShadow: true,
	})
	const { all: e2 } = useShadow({
		shadowName: "elevation2",
		forceBoxShadow: true,
	})
	return (
		<MotionView
			width={100}
			height={100}
			radius={5}
			color={theme.cardStock}
			style={e1}
			whileHover={e2}
		/>
	)
}
export const Shadows = meta.story({
	render: () => (
		<Column grow center>
			<Column between={20}>
				<Row between={30}>
					{Object.keys(shadowStyles).map((name) => (
						<TestBox key={name} shadow={name as ShadowName} />
					))}
				</Row>
				<Row between={30}>
					{Object.keys(shadowStyles).map((name) => (
						<TestBox key={name} shadow={name as ShadowName} forceBoxShadow />
					))}
				</Row>
				<Row between={30}>
					<TestHover />
				</Row>
			</Column>
		</Column>
	),
})

const ContextTestBox = ({
	color,
	children,
}: {
	color?: ViewProps["color"]
	children?: React.ReactNode
}) => {
	const { color: parentColor } = React.useContext(ViewContext)
	return (
		<Row grow center height={40} color={color}>
			<Text>
				My Background Context is: {parentColor?.toString() || "undefined"}
			</Text>
			{children}
		</Row>
	)
}

export const Context = meta.story({
	render: () => (
		<Column>
			<Text>No Color:</Text>
			<ContextTestBox />
			<Text>CardStock Parent:</Text>
			<Row color={"$cardStock"}>
				<ContextTestBox />
			</Row>
			<Text>Nested Under Parent with no color:</Text>
			<Row color={"$cardStock"}>
				<Row grow>
					<ContextTestBox />
				</Row>
			</Row>
			<Text>Nested Under Parent with no color:</Text>
			<Row color={"$cardStock"}>
				<Row grow color={"$primary"}>
					<ContextTestBox />
				</Row>
			</Row>
		</Column>
	),
})
