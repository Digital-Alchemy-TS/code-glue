import { ComponentError } from "../ComponentError"
import { SideNav } from "./SideNav"
import { TabSection } from "./TabSection"
import { VerticalSplit } from "./VerticalSplit"

const Layout = () => (
	<ComponentError text="Layout can't be used by itself. Use a layout it provides (Layout.SideNav for&nbsp;example)." />
)
Layout.SideNav = SideNav
Layout.VerticalSplit = VerticalSplit
Layout.TabSection = TabSection

export { Layout }
