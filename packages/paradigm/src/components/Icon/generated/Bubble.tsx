import { useTheme } from "@tamagui/core"
import * as React from "react"

import { TextContext } from "../../Text"

import type { SVGProps } from "react"
import type { WebIconComponentType } from "../types"

const BubbleIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 64 64"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>{"Bubble"}</title>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M46.4711 42.4565C45.8401 43.1526 45.6633 44.1485 46.0162 45.0192C46.7203 46.5508 47.5854 48.0031 48.5968 49.3516C48.9247 49.8332 48.8 50.4893 48.3184 50.8171C48.1332 50.9432 47.9126 51.0071 47.6886 50.9994C44.9363 50.6474 42.296 49.6906 39.9572 48.1976C39.3494 47.7827 38.588 47.661 37.8811 47.8655C35.9762 48.454 33.9937 48.7534 32 48.7534C21.5068 48.7534 13 40.7497 13 30.8767C13 21.0037 21.5066 13 32 13C42.4934 13 51 21.0036 51 30.8767C50.9881 35.1664 49.3727 39.2967 46.4711 42.4565Z"
			fill={props.fill}
		/>
	</svg>
)
const Bubble: WebIconComponentType = ({
	size,
	color,
	style = {},
	...otherProps
}) => {
	const theme = useTheme()
	const { isInText } = React.useContext(TextContext)
	const fill = color || (isInText ? theme.iconInTextColor.get() : "black")
	const combinedStyle = {
		flexShrink: 0,
		...style,
	}
	return React.createElement(BubbleIcon, {
		...otherProps,
		style: combinedStyle,
		width: size,
		height: size,
		fill,
	})
}
export default Bubble
