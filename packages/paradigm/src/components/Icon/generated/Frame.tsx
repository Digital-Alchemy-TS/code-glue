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
			d="M39 28C45.1017 28 47 32.0317 47 34V54C47 56.4603 45.4746 59 41 59H23C18.5254 59 17 56.4603 17 54V33.9043C17.0003 31.9359 18.8988 28 25 28H39ZM32 5C34 5 35.7771 9.703 36 11C36.2229 12.297 37 18 37 19C37.8 19 41 19.6682 41 20.5V26C41 26.7706 34.9378 26.9698 32 27C29.0622 26.9698 23 26.7706 23 26V20.5C23 19.6682 26.2 19 27 19C27 18 27.7771 12.297 28 11C28.2229 9.703 30 5 32 5Z"
			fill={props.fill}
			style={{
				fill: "#385994",
				fill: "color(display-p3 0.2196 0.3490 0.5804)",
				fillOpacity: 1,
			}}
		/>
	</svg>
)
const Frame = (props: any) => {
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
export default Frame
