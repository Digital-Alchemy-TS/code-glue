import { useSnapshot } from "valtio"

import { Row, Text } from "@code-glue/paradigm"
import { store } from "@/store"
import { CreateAutomation } from "../CreateAutomation"

import type { SectionIds, SectionTitles } from "@/config"

export const MainListItem = ({
	title,
	section,
}: {
	title: SectionTitles
	section: SectionIds
}) => {
	const { currentNavSection } = useSnapshot(store.state)
	return (
		<Row
			color={currentNavSection === section ? "$background" : undefined}
			onPress={() => {
				store.state.currentNavSection = section
			}}
		>
			<Text>{title}</Text>
			<CreateAutomation />
		</Row>
	)
}
