import { useTheme } from "@tamagui/core"
import * as React from "react"

import { TextContext } from "../../Text"

import type { SVGProps } from "react"
import type { WebIconComponentType } from "../types"

const ChevronLeftIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 64 64"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>{"ChevronLeft"}</title>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M42.3015 50.605C43.2328 49.6694 43.2328 48.1514 42.3015 47.2183L27.1378 31.9855L42.284 16.7725C43.2128 15.8394 43.2128 14.3238 42.284 13.3907L40.5991 11.6998C39.6703 10.7667 38.1632 10.7667 37.2344 11.6998L18.6985 30.2823C17.7672 31.2178 17.7672 32.7334 18.6985 33.669L37.2444 52.2983C38.1732 53.2339 39.6854 53.2339 40.6142 52.2983L42.3015 50.605Z"
			fill={props.fill}
		/>
	</svg>
)
const ChevronLeft: WebIconComponentType = ({
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
	return React.createElement(ChevronLeftIcon, {
		...otherProps,
		style: combinedStyle,
		width: size,
		height: size,
		fill,
	})
}
export default ChevronLeft
