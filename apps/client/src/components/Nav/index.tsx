import { useSnapshot } from "valtio"

import { Column, List, ListItem, Row, Text, View } from "@code-glue/paradigm"
import { useRouter } from "@/hooks/useRouter"
import { store } from "@/store"
import { CreateAutomation } from "../CreateAutomation"
export const Nav = () => {
	const { automations } = useSnapshot(store)

	const [{ route, automationId }, navigateTo] = useRouter()

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
					<ListItem
						label="Logs"
						isSelected={route === "logs"}
						onPress={() => navigateTo("logs")}
					/>
				</List.Simple>
				<List.Simple header="Automations">
					<CreateAutomation />
					{Array.from(automations, ([, automation]) => {
						return (
							<ListItem
								label={automation.title}
								key={automation.id}
								isSelected={
									route === "automations" && automation.id === automationId
								}
								onPress={() => {
									navigateTo("automations", { automationId: automation.id })
								}}
							/>
						)
					})}
				</List.Simple>
			</List.Group>
		</Column>
	)
}
