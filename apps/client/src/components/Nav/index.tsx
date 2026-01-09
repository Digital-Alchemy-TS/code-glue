import { useSnapshot } from "valtio"

import {
	Button,
	Column,
	Icon,
	List,
	ListItem,
	Text,
	View,
} from "@code-glue/paradigm"
import { useRouter } from "@/hooks/useRouter"
import { store } from "@/store"
import { CreateAutomation } from "../CreateAutomation"
import { Header } from "../Header"
export const Nav = () => {
	const { automations } = useSnapshot(store)

	const [{ route, automationId }, navigateTo] = useRouter()

	return (
		<Column grow color={"$cardStock"}>
			<Header>
				<img src="./headerLogo.png" alt="CodeGlue" height={42} />
				<Button icon={Icon.Settings} isRaised />
			</Header>
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
