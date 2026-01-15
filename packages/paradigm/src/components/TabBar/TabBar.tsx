import React from "react"

import { Row } from "../View"
import { Tab } from "./Tab"

export type TabBarProps = {
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
	onTabPress?: (index: number) => void
	/**
	 * content to put after the tabs
	 */
	afterTabs?: React.ReactNode
}

export const TabBar = ({ tabs, onTabPress, afterTabs }: TabBarProps) => {
	const layoutIdPrefix = React.useId()

	return (
		<Row
			noShrink
			height={"$tabHeight"}
			center="v"
			borderBottomColor="$uiStroke"
			borderBottomWidth={1}
			borderBottomStyle="solid"
			justifyContent="space-between"
		>
			<Row>
				{tabs.map((tab, index) => (
					<Tab
						key={tab.label}
						label={tab.label}
						isActive={tab.isActive ?? false}
						onPress={() => onTabPress?.(index)}
						layoutIdPrefix={layoutIdPrefix}
					/>
				))}
			</Row>
			{afterTabs && <Row mx={"$edgeInsetClose"}>{afterTabs}</Row>}
		</Row>
	)
}
