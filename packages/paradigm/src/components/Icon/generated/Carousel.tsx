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
			fillRule="evenodd"
			clipRule="evenodd"
			d="M48 52H16C14.3432 52 13 50.6568 13 49V15C13 13.3432 14.3432 12 16 12H48C49.6568 12 51 13.3432 51 15V49C51 50.6568 49.6568 52 48 52ZM54 49C53.4477 49 53 48.5523 53 48V16C53 15.4477 53.4477 15 54 15C55.6568 15 57 16.3432 57 18V46C56.9999 47.6568 55.6568 49 54 49Z"
			fill={props.fill}
			style={{
				fill: "#385994",
				fill: "color(display-p3 0.2196 0.3490 0.5804)",
				fillOpacity: 1,
			}}
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M10 15C10.5523 15 11 15.4477 11 16V48C11 48.5523 10.5523 49 10 49C8.34315 49 7 47.6568 7 46V18C7.00005 16.3432 8.34318 15 10 15Z"
			fill={props.fill}
			style={{
				fill: "#385994",
				fill: "color(display-p3 0.2196 0.3490 0.5804)",
				fillOpacity: 1,
			}}
		/>
	</svg>
)
const Carousel = (props: any) => {
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
export default Carousel
