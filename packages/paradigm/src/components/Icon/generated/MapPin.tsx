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
			d="M45.023 21.0039V21.004C45.023 27.2109 40.6378 32.5532 34.5499 33.7629L34.2835 40.9606C34.1092 45.6664 33.7301 50.3581 33.146 55.0355C33.0688 55.6563 32.503 56.0971 31.8821 56.0199C31.3673 55.9559 30.9617 55.5503 30.8977 55.0355C30.3141 50.3626 29.935 45.671 29.7603 40.9606L29.4939 33.7629C22.4464 32.3702 17.8623 25.5281 19.2549 18.4806C20.6476 11.4331 27.4897 6.84896 34.5372 8.24156C40.6316 9.44589 45.0237 14.7916 45.0229 21.0038L45.023 21.0039Z"
			fill={props.fill}
			style={{
				fill: "#385994",
				fill: "color(display-p3 0.2196 0.3490 0.5804)",
				fillOpacity: 1,
			}}
		/>
	</svg>
)
const MapPin = (props: any) => {
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
export default MapPin
