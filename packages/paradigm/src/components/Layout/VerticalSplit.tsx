import {
	Panel,
	PanelGroup,
	type PanelGroupHandle,
	type PanelHandle,
} from "@window-splitter/react"

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
	 * Defaults to the tab height.
	 */
	collapsedSize?: number
	/**
	 * Should the bottom panel be closed by default?
	 */
	defaultCollapsed?: boolean
	/**
	 * the group handle for controlling the API
	 * https://react-window-splitter-six.vercel.app/docs/examples/imperative
	 */
	panelHandle?: React.RefObject<PanelGroupHandle>
	/**
	 * The top panel handle for controlling the API
	 * https://react-window-splitter-six.vercel.app/docs/examples/imperative
	 */
	topPanelHandle?: React.RefObject<PanelHandle>
	/**
	 * The bottom panel handle for controlling the API
	 * https://react-window-splitter-six.vercel.app/docs/examples/imperative
	 */
	bottomPanelHandle?: React.RefObject<PanelHandle>
}

export const VerticalSplit = ({
	top,
	bottom,
	autosaveId,
	min,
	max,
	defaultSize,
	collapsible = false,
	collapsedSize,
	defaultCollapsed = false,
	panelHandle,
	topPanelHandle,
	bottomPanelHandle,
}: VerticalSplitProps) => {
	return (
		<PanelGroup
			{...(panelHandle && { handle: panelHandle })}
			{...(autosaveId && { autosaveId })}
			orientation="vertical"
			style={{ flex: 1, flexGrow: 1 }}
		>
			<Panel
				style={{ display: "flex" }}
				{...(topPanelHandle && { handle: topPanelHandle })}
			>
				{top}
			</Panel>
			<ResizeHandle horizontal={false} />
			<Panel
				{...(min && { min: `${min}px` })}
				{...(max && { max: `${max}px` })}
				{...(defaultSize && { default: `${defaultSize}px` })}
				{...(collapsedSize && { collapsedSize: `${collapsedSize}px` })}
				collapsible={collapsible}
				defaultCollapsed={defaultCollapsed}
				style={{ display: "flex" }}
				{...(bottomPanelHandle && { handle: bottomPanelHandle })}
				// isStaticAtRest // https://github.com/hipstersmoothie/window-splitter/issues/77
			>
				{bottom}
			</Panel>
		</PanelGroup>
	)
}
