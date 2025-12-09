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
			d="M30 44C30 48.0474 35.963 50.444 35.963 57.1459C35.9838 57.5965 35.6353 57.9787 35.1847 57.9995C35.1798 57.9997 35.1749 57.9999 35.17 58C34.8182 58.0265 34.4994 57.7933 34.418 57.45C33.9385 52.9745 16 48.4058 16 39C16 33.4658 20 31.9806 20 29C20 24.8764 12 22.0833 12 16C12 10.4773 20.9544 6 32 6C43.0456 6 52 10.4773 52 16C52 29.9661 30 33.609 30 44ZM32 9C23.7157 9 17 11.6863 17 15C17 18.3137 23.7155 21 32 21C40.2845 21 47 18.3137 47 15C47 11.6863 40.2844 9 32 9Z"
			fill={props.fill}
			style={{
				fill: "#385994",
				fill: "color(display-p3 0.2196 0.3490 0.5804)",
				fillOpacity: 1,
			}}
		/>
	</svg>
)
const Tornado = (props: any) => {
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
export default Tornado
