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
			d="M39.0106 54.0208C36.0967 54.0208 34.2597 53.0208 32.0106 53.0208C29.7615 53.0208 27.9244 54.0208 25.0106 54.0208C20.0624 54.0208 10.0106 45.5008 10.0106 30.0208C10.0106 20.9308 15.7868 15.0208 23.0106 15.0208C26.9612 15.0208 28.7531 17.0208 32.0106 17.0208C35.2681 17.0208 37.0606 15.0208 41.0106 15.0208C48.2342 15.0208 54.0106 20.9308 54.0106 30.0208C54.01 45.5009 43.9588 54.0208 39.0106 54.0208ZM34.0106 14.0208C33.7474 14.6173 33.1624 15.0073 32.5106 15.0208C31.3736 15.0208 31.0106 14.4387 31.0106 13.0208C31.0106 9.99911 33.4641 6.02081 36.0106 6.02081C37.4583 6.02081 39.0106 6.90351 39.0106 8.02081C39.0106 10.0179 35.9088 10.0418 34.01 14.0209L34.0106 14.0208Z"
			fill={props.fill}
			style={{
				fill: "#385994",
				fill: "color(display-p3 0.2196 0.3490 0.5804)",
				fillOpacity: 1,
			}}
		/>
	</svg>
)
const EmojiFood = (props: any) => {
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
export default EmojiFood
