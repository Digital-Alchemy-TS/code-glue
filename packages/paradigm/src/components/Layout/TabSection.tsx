import React from "react"

import { usePointerEvents } from "../../hooks/usePointerEvents"
import { Text } from "../Text"
import { Column, Row, View } from "../View"

type TabProps = {
	/**
	 * Label for the tab
	 */
	label: string
	/**
	 * Is the tab selected?
	 */
	isActive?: boolean
	/**
	 * Called when the tab is clicked
	 */
	onPress?: () => void
}
const Tab = React.memo(({ label, isActive, onPress }: TabProps) => {
	const { isHovered, pointerProps } = usePointerEvents()
	return (
		<Column>
			<View
				height={"$tabHeight"}
				center="v"
				px={"$edgeInset"}
				onPress={onPress}
				{...pointerProps}
			>
				<Text
					style={Text.style.footnote}
					noUserSelect
					letterCase={Text.letterCase.sentence}
					color={isActive || isHovered ? "$primary" : "$color"}
				>
					{label}
				</Text>
			</View>
			{isActive && (
				<View
					fillContainer
					borderBottomColor={"$primary"}
					borderBottomWidth={3}
				/>
			)}
		</Column>
	)
})

type TabBarProps = {
	/**
	 * Tabs to display in the tab bar
	 */
	tabs: {
		label: string
		isActive?: boolean
	}[]
	/**
	 * Called when a tab is clicked
	 */
	onTabChange?: (index: number) => void
}

const TabBar = React.memo(({ tabs, onTabChange }: TabBarProps) => {
	return (
		<Row noShrink height={"$tabHeight"} center="v">
			<View
				fillContainer
				borderBottomColor="$uiStroke"
				borderBottomWidth={1}
				borderBottomStyle="solid"
			/>
			{tabs.map((tab, index) => (
				<Tab
					key={tab.label}
					label={tab.label}
					isActive={tab.isActive}
					onPress={() => onTabChange?.(index)}
				/>
			))}
		</Row>
	)
})

type TabSectionProps = {
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
	initialTab?: number
}
export const TabSection = ({ tabs, initialTab = 0 }: TabSectionProps) => {
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
			<TabBar tabs={tabBarData} onTabChange={setActiveIndex} />
			<View grow>{activeContent}</View>
		</Column>
	)
}
