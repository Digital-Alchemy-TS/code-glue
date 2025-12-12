import { useTheme } from "tamagui"

import preview from "@/storybook/preview"
import { type ShadowName, shadowStyles } from "../../generated/shadows"
import { useShadow } from "../../hooks/useShadow"
import { Column, MotionView, Row, View, type ViewProps } from "./index"

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
			borderRadius={5}
			backgroundColor={theme.cardStock}
		/>
	)
}

const TestHover = () => {
	const theme = useTheme()
	const e1 = useShadow({ shadowName: "elevation1", forceBoxShadow: true })
	const e2 = useShadow({ shadowName: "elevation2", forceBoxShadow: true })
	return (
		<MotionView
			width={100}
			height={100}
			borderRadius={5}
			backgroundColor={theme.cardStock}
			style={e1}
			whileHover={e2}
		/>
	)
}
export const Shadows = meta.story({
	render: () => (
		<Column gap={20}>
			<Row gap={30}>
				{Object.keys(shadowStyles).map((name) => (
					<TestBox key={name} shadow={name as ShadowName} />
				))}
			</Row>
			<Row gap={30}>
				{Object.keys(shadowStyles).map((name) => (
					<TestBox key={name} shadow={name as ShadowName} forceBoxShadow />
				))}
			</Row>
			<Row gap={30}>
				<TestHover />
			</Row>
		</Column>
	),
})
