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
			d="M47.2957 21.8021C48.2348 20.863 48.2348 19.3412 47.2957 18.4044L45.5979 16.7043C44.6588 15.7652 43.137 15.7652 42.1979 16.7043L32 26.9022L21.8021 16.7043C20.8653 15.7652 19.3435 15.7652 18.4044 16.7043L16.7043 18.4044C15.7652 19.3412 15.7652 20.863 16.7043 21.8021L26.9022 32L16.7043 42.1979C15.7652 43.1347 15.7652 44.6565 16.7043 45.5956L18.4044 47.2957C19.3435 48.2348 20.8653 48.2348 21.8021 47.2957L32 37.0978L42.1979 47.2957C43.137 48.2348 44.6588 48.2348 45.5979 47.2957L47.2957 45.5956C48.2348 44.6565 48.2348 43.1347 47.2957 42.1979L37.1001 32L47.2957 21.8021Z"
			fill={props.fill}
			style={{
				fill: "#385994",
				fill: "color(display-p3 0.2196 0.3490 0.5804)",
				fillOpacity: 1,
			}}
		/>
	</svg>
)
const X = (props: any) => {
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
export default X
