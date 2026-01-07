import { useRouter } from "../../hooks/useRouter"
import { AutomationDetail } from "../AutomationDetail"
export const Content = () => {
	const [{ route }] = useRouter()

	switch (route) {
		case "logs":
			return <div>TODO: Logs Section</div>
		case "automations":
			return <AutomationDetail />
		default:
			return <div>TODO: Home</div>
	}
}
