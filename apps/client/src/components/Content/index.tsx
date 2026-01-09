import { useRouter } from "../../hooks/useRouter"
import { AutomationDetail } from "../AutomationDetail"
export const Content = () => {
	const [{ route }] = useRouter()

	switch (route) {
		case "automations":
			return <AutomationDetail />
		default: // Logs
			return <div>TODO: Logs</div>
	}
}
