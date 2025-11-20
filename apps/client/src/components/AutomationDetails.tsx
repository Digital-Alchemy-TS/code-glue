import { Row, Text } from "@code-glue/paradigm"
import { useCurrentAutomation } from "@/hooks/useAutomation"

export const AutomationDetails: React.FC = () => {
	const { automation, automationSnapshot } = useCurrentAutomation()

	return (
		<Row>
			<Text size="$6">
				{automation ? automationSnapshot.title : "New Automation"}
			</Text>
		</Row>
	)
}
