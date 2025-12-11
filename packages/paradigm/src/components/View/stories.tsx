import { useTheme } from "tamagui"

import preview from "@/storybook/preview"
import { type ShadowName, shadowStyles } from "../../generated/shadows"
import { Column, Row, View, type ViewProps } from "./index"

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
		</Column>
	),
})
