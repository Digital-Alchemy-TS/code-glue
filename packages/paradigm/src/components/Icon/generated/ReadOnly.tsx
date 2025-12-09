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
		<g clipPath="url(#clip0_29_179)">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M32 48.02C17.32 48.02 10.03 36.34 8.21998 32.94L8.20998 32.93C7.89998 32.35 7.89998 31.66 8.20998 31.08C10.02 27.67 17.31 16 31.99 16C46.66 16 53.95 27.67 55.77 31.07C56.07 31.64 56.07 32.33 55.76 32.91C53.94 36.31 46.656 47.98 31.98 47.98L32 48.02ZM32.01 21.02H32C25.92 21.02 21 25.94 21 32.02C21 38.09 25.92 43.01 32 43.01C38.07 43 42.99 38.08 42.99 32.01V32C42.99 25.92 38.06 21 31.99 21C31.98 21 31.98 21 31.98 21L32.01 21.02ZM32.01 39.02L32 39.01C28.13 39 25 35.87 25 32.01C25 28.14 28.13 25.01 32 25.01C35.86 25.01 39 28.14 39 32.01V32C39 35.86 35.86 38.99 32 39L32.01 39.02Z"
				fill={props.fill}
				style={{
					fill: "#385994",
					fill: "color(display-p3 0.2196 0.3490 0.5804)",
					fillOpacity: 1,
				}}
			/>
		</g>
		<defs>
			<clipPath id="clip0_29_179">
				<rect
					width={64}
					height={64}
					fill="white"
					style={{
						fill: "white",
						fillOpacity: 1,
					}}
				/>
			</clipPath>
		</defs>
	</svg>
)
const ReadOnly = (props: any) => {
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
export default ReadOnly
