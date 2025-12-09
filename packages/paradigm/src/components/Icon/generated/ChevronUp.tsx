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
			d="M12.5091 44.4956C13.4892 45.5015 15.0795 45.5015 16.057 44.4956L32.0152 28.1188L47.9527 44.4767C48.9302 45.4798 50.518 45.4798 51.4955 44.4767L53.2669 42.6571C54.2444 41.654 54.2444 40.0263 53.2669 39.0232L33.7995 19.0044C32.8194 17.9985 31.2316 17.9985 30.2515 19.0044L10.7351 39.034C9.75498 40.0371 9.75498 41.6702 10.7351 42.6733L12.5091 44.4956Z"
			fill={props.fill}
			style={{
				fill: "#385994",
				fill: "color(display-p3 0.2196 0.3490 0.5804)",
				fillOpacity: 1,
			}}
		/>
	</svg>
)
const ChevronUp = (props: any) => {
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
export default ChevronUp
