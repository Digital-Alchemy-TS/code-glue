import { Panel, PanelGroup } from "@window-splitter/react"

import { ResizeHandle } from "./Handle"

type SideNavProps = {
	/**
	 * Left panel
	 * Size and settings are adjustable via props
	 */
	nav: React.ReactNode
	/**
	 * Right panel
	 */
	content: React.ReactNode
	/**
	 * To save panel sizes between sessions, provide an autosave ID
	 */
	autosaveId?: string
	/**
	 * Minimum size of the nav panel in pixels
	 */
	min?: number
	/**
	 * Maximum size of the nav panel in pixels
	 */
	max?: number
	/**
	 * Default size of the nav panel in pixels
	 */
	defaultSize?: number
	/**
	 * Can the nav panel be closed all the way?
	 */
	collapsible?: boolean
	/**
	 * If collapsible, how big is the nav panel when closed?
	 */
	collapsedSize?: number
	/**
	 * Should the nav panel be closed by default?
	 */
	defaultCollapsed?: boolean
}

export const SideNav = ({
	nav,
	content,
	autosaveId,
	min = 280,
	max = 560,
	defaultSize = 280,
	collapsible = false,
	collapsedSize,
	defaultCollapsed = false,
}: SideNavProps) => {
	return (
		<PanelGroup orientation="horizontal" autosaveId={autosaveId}>
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
				{nav}
			</Panel>
			<ResizeHandle horizontal={true} />
			<Panel style={{ display: "flex" }}>{content}</Panel>
		</PanelGroup>
	)
}
