import { ComponentError } from "../ComponentError"
import { DualPanel, type DualPanelProps } from "./dualPanel"

const Layout = () => (
	<ComponentError text="Layout can't be used by itself. Use a layout it provides (Layout.HorizontalNav for&nbsp;example)." />
)

const HorizontalNav = (props: Omit<DualPanelProps, "direction">) => (
	<DualPanel direction="horizontal" {...props} />
)
const VerticalNav = (props: Omit<DualPanelProps, "direction">) => (
	<DualPanel direction="vertical" {...props} />
)

Layout.HorizontalNav = HorizontalNav
Layout.VerticalNav = VerticalNav

export { Layout }
