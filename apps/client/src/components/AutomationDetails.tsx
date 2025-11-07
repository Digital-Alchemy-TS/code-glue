import { SizableText, XStack } from "tamagui"

import { useCurrentAutomation } from "@/hooks/useAutomation"

export const AutomationDetails: React.FC = () => {
	const { automation, automationSnapshot } = useCurrentAutomation()

	return (
		<XStack>
			<SizableText size="$6">
				{automation ? automationSnapshot.title : "New Automation"}
			</SizableText>
		</XStack>
	)
}
