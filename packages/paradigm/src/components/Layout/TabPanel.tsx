import React from "react"

import { TabBar, type TabBarProps } from "../TabBar"
import { Column, View } from "../View"

export type TabPanelProps = {
	/**
	 * Tabs to display in the tab bar
	 */
	tabs: {
		label: string
		content: React.ReactNode
	}[]
	/**
	 * Initial active tab index (defaults to 0)
	 */
	initialTab?: number | undefined
} & Pick<TabBarProps, "onTabPress" | "afterTabs">

export const TabPanel = ({
	tabs,
	initialTab = 0,
	onTabPress,
	afterTabs,
}: TabPanelProps) => {
	const [activeIndex, setActiveIndex] = React.useState(initialTab)

	const tabBarData = React.useMemo(
		() =>
			tabs.map((tab, index) => ({
				label: tab.label,
				isActive: index === activeIndex,
			})),
		[tabs, activeIndex],
	)

	const activeContent = React.useMemo(
		() => tabs[activeIndex]?.content,
		[tabs, activeIndex],
	)

	return (
		<Column grow>
			<TabBar
				tabs={tabBarData}
				onTabPress={(index) => {
					setActiveIndex(index)
					onTabPress?.(index)
				}}
				afterTabs={afterTabs}
			/>
			<View grow>{activeContent}</View>
		</Column>
	)
}
