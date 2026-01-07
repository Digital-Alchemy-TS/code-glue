import { useRouter } from "../../hooks/useRouter"
import { AutomationDetail } from "../AutomationDetail"
export const Content = () => {
	const [{ route }] = useRouter()

	switch (route) {
		case "logs":
			return <div>Logs Section</div>
		case "automations":
			return <AutomationDetail />
		default:
			return <div>Home</div>
	}
}
