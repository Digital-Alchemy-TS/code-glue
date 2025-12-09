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
			d="M49 48H17C10.9286 48.0034 6.00389 43.0843 6.00049 37.0129C5.99744 31.5833 9.95889 26.9646 15.3257 26.1407L15.3257 26.1407C16.8983 19.1419 23.8469 14.7431 30.8458 16.3157C34.0204 17.0291 36.8116 18.908 38.6673 21.5807C43.8501 19.7289 49.5529 22.4292 51.4047 27.6121C51.7382 28.5455 51.9306 29.5235 51.9755 30.5138C56.6649 32.154 59.1368 37.2852 57.4966 41.9745C56.2336 45.5853 52.8253 48.0024 49 48L49 48Z"
			fill={props.fill}
			style={{
				fill: "#385994",
				fill: "color(display-p3 0.2196 0.3490 0.5804)",
				fillOpacity: 1,
			}}
		/>
	</svg>
)
const Cloudy = (props: any) => {
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
export default Cloudy
