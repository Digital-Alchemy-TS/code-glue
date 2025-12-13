import { Panel, PanelGroup } from "react-resizable-panels"

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
		<PanelGroup autoSaveId="persistence" direction={direction}>
			<Panel
				defaultSize={15}
				minSize={15}
				maxSize={30}
				collapsible={false}
				style={{ display: "flex" }}
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
