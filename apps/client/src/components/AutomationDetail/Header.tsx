import { useSnapshot } from "valtio"

import { Button, Column, Row, Text, TextInput } from "@code-glue/paradigm"
import { useCurrentAutomation } from "@/hooks/useAutomation"
import { store } from "@/store"

export const Header = () => {
	const { automation, automationSnapshot, saveCurrentAutomation } =
		useCurrentAutomation()
	const { isBodyEdited, newAutomationTitle } = useSnapshot(store.state)

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
				<Button label="Save" onPress={saveCurrentAutomation} />
			</Row>
		</Column>
	)
}
