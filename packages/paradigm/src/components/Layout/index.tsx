import { ComponentError } from "../ComponentError"
import { DualPanel } from "./dualPanel"

const Layout = () => (
	<ComponentError text="Layout can't be used by itself. Use a layout it provides (Layout.SideNav for&nbsp;example)." />
)

const SideNav = ({
	nav,
	content,
}: {
	nav: React.ComponentProps<typeof DualPanel>["a"]
	content: React.ComponentProps<typeof DualPanel>["b"]
}) => <DualPanel direction="horizontal" a={nav} b={content} />

const VerticalSplit = ({
	top,
	bottom,
}: {
	top: React.ComponentProps<typeof DualPanel>["a"]
	bottom: React.ComponentProps<typeof DualPanel>["b"]
}) => <DualPanel direction="vertical" a={top} b={bottom} />

Layout.SideNav = SideNav
Layout.VerticalSplit = VerticalSplit

export { Layout }
