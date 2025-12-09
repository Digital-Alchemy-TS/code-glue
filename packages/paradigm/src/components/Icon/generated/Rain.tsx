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
			d="M54 29C54 32.866 50.866 36 47 36H19C14.0294 35.9959 10.0033 31.9631 10.0074 26.9926C10.0112 22.3963 13.4778 18.5413 18.0479 18.0513L18.0479 18.0513C18.5648 12.0052 23.8852 7.523 29.9312 8.0399C33.4792 8.34324 36.6601 10.3472 38.4656 13.4165C42.6266 11.9954 47.1517 14.2166 48.5728 18.3776C49.0022 19.6351 49.1101 20.9801 48.8866 22.29C51.9029 23.1269 53.9931 25.8697 54 29L54 29ZM20.1766 39.1152C20.6707 38.1268 21.8725 37.726 22.8609 38.2201C23.8493 38.7142 24.2501 39.916 23.756 40.9044L16.7532 54.9086C16.2599 55.8973 15.0584 56.2989 14.0697 55.8055C13.081 55.3121 12.6794 54.1107 13.1728 53.122C13.1732 53.1211 13.1737 53.1203 13.1741 53.1194L20.1766 39.1152ZM30.1809 39.1152C30.6757 38.1272 31.8777 37.7274 32.8657 38.2222C33.8527 38.7165 34.2528 39.9167 33.76 40.9044L26.7573 54.9086C26.2632 55.897 25.0615 56.2977 24.0731 55.8036C23.0847 55.3095 22.684 54.1078 23.1781 53.1194L30.1809 39.1152ZM40.1852 39.1152C40.68 38.1272 41.882 37.7274 42.87 38.2222C43.857 38.7165 44.2571 39.9167 43.7643 40.9044L36.7613 54.9086C36.2672 55.8969 35.0655 56.2975 34.0773 55.8034C33.089 55.3094 32.6883 54.1077 33.1824 53.1194L40.1852 39.1152Z"
			fill={props.fill}
			style={{
				fill: "#385994",
				fill: "color(display-p3 0.2196 0.3490 0.5804)",
				fillOpacity: 1,
			}}
		/>
	</svg>
)
const Rain = (props: any) => {
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
export default Rain
