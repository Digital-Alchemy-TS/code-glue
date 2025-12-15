import { Panel, PanelGroup } from "@window-splitter/react"

import { ResizeHandle } from "./Handle"

type VerticalSplitProps = {
	/**
	 * Top panel
	 */
	top: React.ReactNode
	/**
	 * Bottom panel
	 * Size and settings are adjustable via props
	 */
	bottom: React.ReactNode
	/**
	 * To save panel sizes between sessions, provide an autosave ID
	 */
	autosaveId?: string
	/**
	 * Minimum size of the bottom panel in pixels
	 */
	min?: number
	/**
	 * Maximum size of the bottom panel in pixels
	 */
	max?: number
	/**
	 * Default size of the bottom panel in pixels
	 */
	defaultSize?: number
	/**
	 * Can the bottom panel be closed all the way?
	 */
	collapsible?: boolean
	/**
	 * If collapsible, how big is the bottom panel when closed?
	 */
	collapsedSize?: number
	/**
	 * Should the bottom panel be closed by default?
	 */
	defaultCollapsed?: boolean
}

export const VerticalSplit = ({
	top,
	bottom,
	autosaveId,
	min = 280,
	max = 560,
	defaultSize = 280,
	collapsible = false,
	collapsedSize,
	defaultCollapsed = false,
}: VerticalSplitProps) => {
	return (
		<PanelGroup
			orientation="vertical"
			autosaveId={autosaveId}
			style={{ flex: 1, flexGrow: 1 }}
		>
			<Panel style={{ display: "flex" }}>{top}</Panel>
			<ResizeHandle horizontal={false} />
			<Panel
				min={`${min}px`}
				max={`${max}px`}
				default={`${defaultSize}px`}
				collapsible={collapsible}
				collapsedSize={collapsedSize ? `${collapsedSize}px` : undefined}
				defaultCollapsed={defaultCollapsed}
				isStaticAtRest={true}
				style={{ display: "flex" }}
			>
				{bottom}
			</Panel>
		</PanelGroup>
	)
}
