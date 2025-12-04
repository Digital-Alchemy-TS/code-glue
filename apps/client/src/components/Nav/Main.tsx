import { useSnapshot } from "valtio/react"

import { Column, Row, Text, View } from "@code-glue/paradigm"
import { store } from "@/store"

export const MainNav = () => {
	const { automations } = useSnapshot(store)

	return (
		<Column
			backgroundColor="$cardStock"
			borderRightColor="$borderColor"
			borderRightWidth="$size.stroke"
			width={240}
		>
			<Row alignItems="center" background="$background" height={49}>
				<View mx={12}>
					<img
						src="./mstile-310x310.png"
						alt="CodeGlue"
						width={42}
						height={42}
					/>
				</View>

				<Text size="$5">Code Glue</Text>
			</Row>
			<Column
				flexDirection="column"
				gap={10}
				marginTop={10}
				padding="$space.edgeInset"
			>
				<View
					onPress={() => {
						store.state.currentAutomationId = null
					}}
				>
					<Text>New Automation</Text>
				</View>
				{Array.from(automations, ([, automation]) => (
					<View
						key={automation.id}
						onPress={() => {
							store.state.currentAutomationId = automation.id
						}}
					>
						<Text size="$3">{automation.title}</Text>
					</View>
				))}
			</Column>
		</Column>
	)
}
