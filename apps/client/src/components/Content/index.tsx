import { useRouter } from "../../hooks/useRouter"
import { AutomationDetail } from "../AutomationDetail"
import { Logs } from "../Logs"
export const Content = () => {
	const [{ route }] = useRouter()

	switch (route) {
		case "automations":
			return <AutomationDetail />
		default: // Logs
			return <Logs />
	}
}
