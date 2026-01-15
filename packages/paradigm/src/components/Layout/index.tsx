import { Panel, PanelGroup } from "@window-splitter/react"

import { ComponentError } from "../ComponentError"
import { ResizeHandle } from "./Handle"
import { SideNav } from "./SideNav"
import { TabPanel } from "./TabPanel"
import { VerticalSplitWithTabPanel } from "./VerticalContentWithTabPanel"
import { VerticalSplit } from "./VerticalSplit"

const Layout = () => (
	<ComponentError text="Layout can't be used by itself. Use a layout it provides (Layout.SideNav for&nbsp;example)." />
)
Layout.SideNav = SideNav
Layout.VerticalSplit = VerticalSplit
Layout.VerticalSplitWithTabPanel = VerticalSplitWithTabPanel
Layout.TabPanel = TabPanel
Layout.Panel = Panel
Layout.PanelGroup = PanelGroup
Layout.ResizeHandle = ResizeHandle

export { Layout }
