import { useSnapshot } from "valtio"

import { Column, List, ListItem, Row, Text, View } from "@code-glue/paradigm"
import { useQuery } from "@/hooks/useQuery"
import { store } from "@/store"
export const Nav = () => {
	const { automations } = useSnapshot(store)

	const [currentAutomationId, setCurrentAutomationId] = useQuery(
		useQuery.queries.currentAutomationId,
	)
	return (
		<Column grow color={"$cardStock"}>
			<Row alignItems="center" background="$background">
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
			<List.Group>
				<List.Simple>
					<ListItem label="Logs" />
				</List.Simple>
				<List.Simple header="Automations">
					{Array.from(automations, ([, automation]) => {
						return (
							<ListItem
								label={automation.title}
								key={automation.id}
								isSelected={automation.id === currentAutomationId}
								onPress={() => {
									setCurrentAutomationId(automation.id)
								}}
							/>
						)
					})}
				</List.Simple>
			</List.Group>
		</Column>
	)
}
