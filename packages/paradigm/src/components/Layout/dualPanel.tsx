import { Panel, PanelGroup } from "@window-splitter/react"

import { ResizeHandle } from "./Handle"

type DualPanelProps = {
	a: React.ReactNode
	b: React.ReactNode
	direction: "horizontal" | "vertical"
}

export const DualPanel = ({
	a: nav,
	b: content,
	direction,
}: DualPanelProps) => {
	return (
		<PanelGroup orientation={direction}>
			<Panel
				default={"280px"}
				min={"280px"}
				max={"560px"}
				collapsible={false}
				style={{ display: "flex", flexGrow: 1 }}
				isStaticAtRest
			>
				{nav}
			</Panel>
			<ResizeHandle horizontal={direction === "horizontal"} />
			<Panel collapsible={false} style={{ display: "flex" }}>
				{content}
			</Panel>
		</PanelGroup>
	)
}
