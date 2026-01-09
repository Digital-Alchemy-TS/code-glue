import { Row, useTheme } from "@code-glue/paradigm"

export const Header = ({ children }: { children: React.ReactNode }) => {
	const theme = useTheme()
	return (
		<Row
			align="center"
			justify="space-between"
			color={theme.cardStock}
			borderBottomStyle="solid"
			borderBottomColor={theme.uiStroke}
			borderBottomWidth="$thinStroke"
			height="$headerHeight"
			px="$edgeInset"
		>
			{children}
		</Row>
	)
}
