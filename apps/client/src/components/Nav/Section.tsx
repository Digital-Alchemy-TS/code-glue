import { Column, Text, View } from "@code-glue/paradigm"
import { store } from "@/store"

export const Section = ({
	title,
	children,
}: {
	title: string
	children: React.ReactNode
}) => {
	return (
		<Column
			backgroundColor="$background"
			borderRightColor="$borderColor"
			borderRightWidth="$size.stroke"
			width={240}
		>
			<View
				onPress={() => {
					store.state.currentNavSection = null
				}}
			>
				Close
			</View>
			<Text>{title}</Text>
			{children}
		</Column>
	)
}
