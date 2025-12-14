import { Panel, PanelGroup } from "@window-splitter/react"

import { ResizeHandle } from "./Handle"

type DualPanelProps = {
	a: React.ReactNode
	b: React.ReactNode
	direction: "horizontal" | "vertical"
	autosaveId?: string
}

export const DualPanel = ({
	a: nav,
	b: content,
	direction,
	autosaveId,
}: DualPanelProps) => {
	const activePanelProps = {
		default: direction === "horizontal" ? "280px" : "40px",
		min: direction === "horizontal" ? "280px" : "40px",
		max: "560px",
		collapsible: direction !== "horizontal",
		collapsedSize: "40px",
		isStaticAtRest: true,
	}
	return (
		<PanelGroup orientation={direction} autosaveId={autosaveId}>
			<Panel
				style={{ display: "flex" }}
				{...(direction === "horizontal" ? activePanelProps : {})}
			>
				{nav}
			</Panel>
			<ResizeHandle horizontal={direction === "horizontal"} />
			<Panel
				style={{ display: "flex" }}
				{...(direction === "vertical" ? activePanelProps : {})}
			>
				{content}
			</Panel>
		</PanelGroup>
	)
}
