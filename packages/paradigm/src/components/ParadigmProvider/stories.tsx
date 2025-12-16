import { H2, useTheme } from "tamagui"

import preview from "@/storybook/preview"
import { Text } from "../Text"
import { Column, Row } from "../View"
import { ParadigmProvider } from "."

const meta = preview.meta({
	component: ParadigmProvider,
})

const ThemeDisplay = ({ title }: { title: string }) => {
	const theme = useTheme()

	return (
		<Column color="$background" p={20}>
			<H2>{title}</H2>
			{Object.entries(theme).map(
				([key, value]) =>
					key.startsWith("$") && (
						<Row key={key} between={10} noShrink>
							<Text>{key}:</Text>
							<Text color={value?.get()}>{value?.val}</Text>
						</Row>
					),
			)}
		</Column>
	)
}

export const Default = meta.story({
	render: () => (
		<ParadigmProvider>
			<Row grow center="h" between={20} color="$cardStock">
				<ThemeDisplay title="Default Theme" />
			</Row>
		</ParadigmProvider>
	),
})
