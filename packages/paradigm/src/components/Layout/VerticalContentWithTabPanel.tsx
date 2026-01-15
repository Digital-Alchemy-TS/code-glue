import {
	Panel,
	PanelGroup,
	type PanelGroupHandle,
	type PanelHandle,
	type PanelProps,
} from "@window-splitter/react"
import { AnimatePresence, spring } from "motion/react"
import React from "react"

import { baseTokens } from "../../config/tamagui.config"
import { Button } from "../Button"
import { Icon } from "../Icon"
import { MotionView } from "../View"
import { ResizeHandle } from "./Handle"
import { TabPanel, type TabPanelProps } from "./TabPanel"

type VerticalSplitProps = {
	/**
	 * Top panel content
	 */
	content: React.ReactNode
	/**
	 * default state
	 */
	defaultState?: {
		collapsed: boolean
		size: PanelProps["min"]
	}
} & TabPanelProps

export const VerticalSplitWithTabPanel = ({
	content,
	tabs,
	initialTab,
	defaultState,
}: VerticalSplitProps) => {
	const [collapsed, setCollapsed] = React.useState(true)
	const tabHandle = React.useRef<PanelHandle>(null)

	const initialSize =
		defaultState?.size ??
		`${baseTokens.size.tabHeight + baseTokens.size.tabContentDefaultSize}px`

	const min =
		`${baseTokens.size.tabHeight + baseTokens.size.tabContentMinHeight}px` as const

	const springFn = React.useMemo(() => {
		return spring({
			keyframes: [0, 1],
			velocity: 10,
			stiffness: 300,
			damping: 18,
			mass: 0.5,
		})
	}, [])

	return (
		<PanelGroup orientation="vertical" style={{ flex: 1, flexGrow: 1 }}>
			<Panel style={{ display: "flex" }}>{content}</Panel>
			<ResizeHandle horizontal={false} />
			<Panel
				handle={tabHandle}
				min={min}
				max={"90%"}
				default={initialSize}
				collapsedSize={`${baseTokens.size.tabHeight}px`}
				collapsible
				defaultCollapsed
				collapsed={collapsed}
				onCollapseChange={setCollapsed}
				collapseAnimation={{
					easing: (t) => springFn.next(t * 250).value,
					duration: 250,
				}}
				style={{ display: "flex" }}
				// isStaticAtRest // https://github.com/hipstersmoothie/window-splitter/issues/77
			>
				<TabPanel
					tabs={tabs}
					initialTab={initialTab ?? undefined}
					onTabPress={() => {
						if (collapsed) {
							setCollapsed(false)
							tabHandle.current?.setSize(initialSize)
						}
					}}
					afterTabs={
						<AnimatePresence>
							{!collapsed && (
								<MotionView exit={{ right: -40 }}>
									<Button
										icon={Icon.X}
										size="small"
										onPress={() => {
											setCollapsed(true)
										}}
									/>
								</MotionView>
							)}
						</AnimatePresence>
					}
				/>
			</Panel>
		</PanelGroup>
	)
}
