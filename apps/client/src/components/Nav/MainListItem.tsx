import { useSnapshot } from "valtio"

import { Text, View } from "@code-glue/paradigm"
import { store } from "@/store"

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
		<View
			backgroundColor={
				currentNavSection === section ? "$background" : undefined
			}
			onPress={() => {
				store.state.currentNavSection = section
			}}
		>
			<Text>{title}</Text>
		</View>
	)
}
