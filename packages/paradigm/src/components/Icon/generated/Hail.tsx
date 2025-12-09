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
			d="M54 29C54 32.866 50.866 36 47 36H19C14.0294 35.9959 10.0033 31.9631 10.0074 26.9926C10.0112 22.3963 13.4778 18.5413 18.0479 18.0513L18.0479 18.0513C18.5648 12.0052 23.8852 7.523 29.9312 8.0399C33.4792 8.34324 36.6601 10.3472 38.4656 13.4165H38.4656C42.6259 11.9949 47.151 14.215 48.5726 18.3753C49.0025 19.6335 49.1105 20.9794 48.8865 22.29C51.9028 23.1271 53.9929 25.8698 53.9999 29L54 29ZM18 48C19.6569 48 21 49.3431 21 51C21 52.6568 19.6569 54 18 54C16.3432 54 15 52.6568 15 51C15 49.3431 16.3432 48 18 48ZM19 43C19 41.3431 20.3432 40 22 40C23.6569 40 25 41.3431 25 43C25 44.6568 23.6569 46 22 46C20.3432 46 19 44.6568 19 43ZM28 48C29.6569 48 31 49.3431 31 51C31 52.6568 29.6569 54 28 54C26.3432 54 25 52.6568 25 51C25 49.3431 26.3432 48 28 48ZM29 43C29 41.3431 30.3432 40 32 40C33.6569 40 35 41.3431 35 43C35 44.6568 33.6569 46 32 46C30.3432 46 29 44.6568 29 43ZM38 48C39.6569 48 41 49.3431 41 51C41 52.6568 39.6569 54 38 54C36.3432 54 35 52.6568 35 51C35 49.3431 36.3432 48 38 48ZM39 43C39 41.3431 40.3432 40 42 40C43.6569 40 45 41.3431 45 43C45 44.6568 43.6569 46 42 46C40.3432 46 39 44.6568 39 43Z"
			fill={props.fill}
			style={{
				fill: "#385994",
				fill: "color(display-p3 0.2196 0.3490 0.5804)",
				fillOpacity: 1,
			}}
		/>
	</svg>
)
const Hail = (props: any) => {
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
export default Hail
