import { useRouter } from "../../hooks/useRouter"
import { AutomationDetail } from "../AutomationDetail"
import { LogScreen } from "../LogScreen"
export const Content = () => {
	const [{ route }] = useRouter()

	switch (route) {
		case "automations":
			return <AutomationDetail />
		default: // Logs
			return <LogScreen />
	}
}
