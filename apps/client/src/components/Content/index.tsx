import { useQuery } from "../../hooks/useQuery"
import { AutomationDetail } from "../AutomationDetail"
export const Content = () => {
	const [currentSection, setCurrentSection] = useQuery(
		useQuery.queries.currentSection,
	)
	return <AutomationDetail />
}
