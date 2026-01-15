import { parseAsBoolean, useQueryState } from "nuqs"
import { useSnapshot } from "valtio"

import { Button, Column, Icon, List, ListItem } from "@code-glue/paradigm"
import { useRouter } from "@/hooks/useRouter"
import { store } from "@/store"
import { CreateAutomation } from "../../components/CreateAutomation"
import { Header } from "../../components/Header"
import { Settings } from "./Settings"
export const Nav = () => {
	const { automations } = useSnapshot(store)

	const [{ route, automationId }, navigateTo] = useRouter()

	const [isSettings, setIsSettings] = useQueryState(
		"settings",
		parseAsBoolean.withDefault(false),
	)

	return (
		<Column grow color={"$cardStock"}>
			<Header>
				<img src="./headerLogo.png" alt="CodeGlue" height={42} />
				<Button
					icon={isSettings ? Icon.X : Icon.Settings}
					isRaised
					onPress={() => {
						setIsSettings(!isSettings)
					}}
				/>
			</Header>
			{isSettings ? (
				<Settings />
			) : (
				<List.Group>
					<List.Simple>
						<ListItem
							label="Logs"
							isSelected={!route}
							onPress={() => navigateTo("home")}
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
			)}
		</Column>
	)
}
