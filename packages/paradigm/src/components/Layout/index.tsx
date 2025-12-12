import { ComponentError } from "../ComponentError"
import { HorizontalNav } from "./HorizontalNav"

const Layout = () => (
	<ComponentError text="Layout can't be used by itself. Use a layout it provides (Layout.HorizontalNav for&nbsp;example)." />
)

Layout.HorizontalNav = HorizontalNav

export { Layout }
