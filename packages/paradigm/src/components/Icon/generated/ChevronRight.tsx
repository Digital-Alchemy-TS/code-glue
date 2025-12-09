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
			d="M21.6985 50.605C20.7672 49.6694 20.7672 48.1514 21.6985 47.2183L36.8622 31.9855L21.716 16.7725C20.7872 15.8394 20.7872 14.3238 21.716 13.3907L23.4009 11.6998C24.3297 10.7667 25.8368 10.7667 26.7656 11.6998L45.3015 30.2823C46.2328 31.2178 46.2328 32.7334 45.3015 33.669L26.7556 52.2983C25.8268 53.2339 24.3146 53.2339 23.3858 52.2983L21.6985 50.605Z"
			fill={props.fill}
			style={{
				fill: "#385994",
				fill: "color(display-p3 0.2196 0.3490 0.5804)",
				fillOpacity: 1,
			}}
		/>
	</svg>
)
const ChevronRight = (props: any) => {
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
export default ChevronRight
