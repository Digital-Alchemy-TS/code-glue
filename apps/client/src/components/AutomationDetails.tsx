import { useSnapshot } from "valtio"

import { Button, Column, Row, Text, TextInput } from "@code-glue/paradigm"
import { useCurrentAutomation } from "@/hooks/useAutomation"
import { createAutomation, store } from "@/store"

export const AutomationDetails: React.FC = () => {
	const { automation, automationSnapshot } = useCurrentAutomation()
	const { isBodyEdited, newAutomationTitle, currentEditorBody } = useSnapshot(
		store.state,
	)

	return (
		<Column borderBottomColor="$borderColor" borderBottomWidth="$size.stroke">
			<Row mx={12}>
				<Text>Name:</Text>
				<TextInput
					onChangeText={(title) => {
						if (automation) {
							automation.update({ title })
						} else {
							store.state.newAutomationTitle = title
						}
					}}
					value={automation ? automationSnapshot.title : newAutomationTitle}
				/>
			</Row>
			<Row>
				<Text>Status:</Text>
				<Text>{isBodyEdited ? "Edited" : "Unedited"}</Text>
				<Button
					label="Save"
					onPress={() => {
						if (automation) {
							automation.update({
								body: store.state.currentEditorBody,
							})
						} else {
							const newAutomation = createAutomation({
								title: newAutomationTitle,
								body: currentEditorBody,
							})

							store.state.currentAutomationId = newAutomation.id
						}

						// reset edited state
						store.state.isBodyEdited = false
					}}
				/>
			</Row>
		</Column>
	)
}
