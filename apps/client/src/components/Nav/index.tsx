import { useSnapshot } from "valtio"

import { Column, Row, Stack, Text, View } from "@code-glue/paradigm"
import { appConfig } from "@/config"
import { useQuery } from "@/hooks/useQuery"
import { store } from "@/store"
import { MainListItem } from "./MainListItem"
export const Nav = () => {
	const { automations } = useSnapshot(store)
	const [currentAutomationId, setCurrentAutomationId] = useQuery(
		useQuery.queries.currentAutomationId,
	)
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
			<Stack>
				<Column flexDirection="column" gap={10} padding="$space.edgeInset">
					{appConfig.sections.map(({ id, title }) => (
						<MainListItem key={id} title={title} section={id} />
					))}
					<View
						backgroundColor={
							currentAutomationId === null ? "$background" : undefined
						}
						onPress={() => {
							store.state.currentAutomationId = null
						}}
					>
						<Text>New Automation</Text>
					</View>
					{Array.from(automations, ([, automation]) => (
						<View
							key={automation.id}
							backgroundColor={
								automation.id === currentAutomationId
									? "$background"
									: undefined
							}
							onPress={() => {
								setCurrentAutomationId(automation.id)
							}}
						>
							<Text size="$3">{automation.title}</Text>
						</View>
					))}
				</Column>
			</Stack>
		</Column>
	)
}
