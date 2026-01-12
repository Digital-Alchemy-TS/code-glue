import { Button, ButtonRow, Row, Text, TextInput } from "@code-glue/paradigm"
import { Header } from "@/components/Header"
import { useCurrentAutomation } from "@/hooks/useAutomation"
import { useRouter } from "@/hooks/useRouter"

export const AutomationHeader = () => {
	const { automation, automationSnapshot, saveCurrentAutomation } =
		useCurrentAutomation()
	const [, navigateTo] = useRouter()

	return (
		<Header>
			<Row mx={12}>
				<Text>Name:</Text>
				<TextInput
					onChangeText={(title) => {
						if (automation) {
							automation.update({ title })
						}
					}}
					value={automation ? automationSnapshot.title : ""}
				/>
			</Row>
			<Row>
				<Text>Status:</Text>
				<Text>{automation?._isEdited ? "Edited" : "Unedited"}</Text>
				<ButtonRow>
					<Button label="Save" isRaised onPress={saveCurrentAutomation} />
					<Button
						label="Delete"
						isRaised
						isNegative
						onPress={() => {
							automation?.delete()
							navigateTo("home")
						}}
					/>
				</ButtonRow>
			</Row>
		</Header>
	)
}
