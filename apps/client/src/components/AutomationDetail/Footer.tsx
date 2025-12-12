import { Button, Column, Row, Text, TextInput } from "@code-glue/paradigm"
import { useCurrentAutomation } from "@/hooks/useAutomation"
import { store } from "@/store"

export const Footer = () => {
	const { automation, automationSnapshot } = useCurrentAutomation()

	return (
		<Column borderBottomColor="$borderColor" borderBottomWidth="$size.stroke">
			<Row>
				<Text>Header</Text>
			</Row>
			<Row>
				<Text>Content</Text>
			</Row>
		</Column>
	)
}
