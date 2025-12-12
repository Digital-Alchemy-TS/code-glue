import { Panel, PanelGroup } from "react-resizable-panels"

import { ResizeHandle } from "./Handle"

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
			<ResizeHandle />
			<Panel collapsible={false} style={{ display: "flex" }}>
				{content}
			</Panel>
		</PanelGroup>
	)
}
