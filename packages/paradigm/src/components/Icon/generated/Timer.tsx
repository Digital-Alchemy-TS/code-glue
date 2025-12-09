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
			d="M26.511 12.5896V9.9971V9.9971C26.511 8.89253 27.4064 7.9971 28.511 7.9971H34.511C35.6155 7.9971 36.511 8.89253 36.511 9.9971V12.5896C39.8001 13.3625 42.8664 14.8843 45.471 17.0366L47.0065 15.501C46.2904 14.7177 46.3151 13.5103 47.0625 12.7569L48.2465 11.5731V11.5731C49.0275 10.7921 50.2937 10.7921 51.0748 11.5731L53.9034 14.4015C54.6842 15.1827 54.6842 16.4488 53.9034 17.23L52.7195 18.4138C51.9781 19.1525 50.7918 19.1924 50.0026 18.5051L48.4821 20.0263L48.4821 20.0263C56.2043 29.4023 54.8636 43.2632 45.4876 50.9855C36.1115 58.7077 22.2507 57.3671 14.5284 47.991C6.80615 38.615 8.14683 24.7541 17.5229 17.0318C20.1369 14.8788 23.2129 13.3586 26.5109 12.5896L26.511 12.5896ZM29.5059 40.9283V40.9283C29.4645 42.0359 30.3288 42.9674 31.4364 43.0088C32.544 43.0501 33.4755 42.1858 33.5169 41.0782C33.5187 41.0283 33.5187 40.9783 33.5169 40.9283L33.3744 37.5168C35.3242 36.4966 36.0778 34.0889 35.0576 32.1391C34.6282 31.3186 33.9264 30.6732 33.0729 30.3139L32.5143 16.9686V16.9686C32.4889 16.4148 32.0194 15.9863 31.4655 16.0117C30.9472 16.0354 30.5323 16.4502 30.5086 16.9686L29.9503 30.3138C27.922 31.1676 26.9699 33.5039 27.8236 35.5322C28.1829 36.3857 28.8282 37.0875 29.6488 37.5168L29.5059 40.9283Z"
			fill={props.fill}
			style={{
				fill: "#385994",
				fill: "color(display-p3 0.2196 0.3490 0.5804)",
				fillOpacity: 1,
			}}
		/>
	</svg>
)
const Timer = (props: any) => {
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
export default Timer
