import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"

import { Column } from "../View"

type HorizontalNavProps = {
	nav: React.ReactNode
	content: React.ReactNode
}

export const HorizontalNav = ({ nav, content }: HorizontalNavProps) => {
	return (
		<PanelGroup autoSaveId="persistence" direction="horizontal">
			<Panel
				defaultSize={15}
				minSize={15}
				maxSize={30}
				collapsible={false}
				style={{ display: "flex" }}
			>
				{nav}
			</Panel>
			<PanelResizeHandle style={{ backgroundColor: "green", width: 10 }} />
			<Panel collapsible={false} style={{ display: "flex" }}>
				{content}
			</Panel>
		</PanelGroup>
	)
}
