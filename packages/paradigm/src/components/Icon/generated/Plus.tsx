import * as React from "react"
import type { SVGProps } from "react"
import { TextContext } from "../../../Text/TextContext"
import { useDesign } from "../../../DesignSystem"
const undefinedIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 64 64"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M28 28H15.5C14.5694 28 14.104 28 13.7275 28.1224C12.9664 28.3697 12.3697 28.9664 12.1224 29.7275C12 30.104 12 30.5694 12 31.5C12 32.4306 12 32.896 12.1224 33.2725C12.3697 34.0336 12.9664 34.6303 13.7275 34.8776C14.104 35 14.5694 35 15.5 35H28V48.5C28 49.4306 28 49.896 28.1224 50.2725C28.3697 51.0336 28.9664 51.6303 29.7275 51.8776C30.104 52 30.5694 52 31.5 52C32.4306 52 32.896 52 33.2725 51.8776C34.0336 51.6303 34.6303 51.0336 34.8776 50.2725C35 49.896 35 49.4306 35 48.5V35H48.5C49.4306 35 49.896 35 50.2725 34.8776C51.0336 34.6303 51.6303 34.0336 51.8776 33.2725C52 32.896 52 32.4306 52 31.5C52 30.5694 52 30.104 51.8776 29.7275C51.6303 28.9664 51.0336 28.3697 50.2725 28.1224C49.896 28 49.4306 28 48.5 28H35V15.5C35 14.5694 35 14.104 34.8776 13.7275C34.6303 12.9664 34.0336 12.3697 33.2725 12.1224C32.896 12 32.4306 12 31.5 12C30.5694 12 30.104 12 29.7275 12.1224C28.9664 12.3697 28.3697 12.9664 28.1224 13.7275C28 14.104 28 14.5694 28 15.5V28Z"
			fill={props.fill}
			style={{
				fill: "#385994",
				fill: "color(display-p3 0.2196 0.3490 0.5804)",
				fillOpacity: 1,
			}}
		/>
	</svg>
)
const Plus = (props: any) => {
	const { size, color = "black", style = {}, ...otherProps } = props
	let fill = color
	const { variables } = useDesign()
	const { isInText } = React.useContext(TextContext)
	if (isInText) {
		style.verticalAlign = "bottom"
		fill = variables.iconInTextColor
	}
	return React.createElement(undefinedIcon, {
		...otherProps,
		style,
		width: size,
		height: size,
		fill,
	})
}
export default Plus
