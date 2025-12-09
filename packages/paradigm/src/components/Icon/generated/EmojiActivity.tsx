import { useTheme } from "@tamagui/core"
import * as React from "react"

import { TextContext } from "../../Text"

import type { SVGProps } from "react"
import type { WebIconComponentType } from "../types"

const EmojiActivityIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 64 64"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>{"EmojiActivity"}</title>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M52.01 10.0209C53.0148 10.2311 53.7998 11.0161 54.01 12.0209C54.01 13.6887 39.3708 31.6602 35.51 35.5209C33.0074 38.0236 29.6022 40.0209 27.76 40.0209C26.943 40.0209 24.01 37.023 24.01 36.2709C24.01 34.4285 26.0073 31.0235 28.51 28.5209C32.3712 24.66 50.3426 10.0209 52.01 10.0209ZM9.01001 49.0209C9.01001 48.1452 10.0649 48.7883 11.6769 47.1775C13.0289 45.8266 12.521 42.6675 15.3461 39.8446C17.7762 37.4128 21.7175 37.4114 24.1493 39.8414C26.581 42.2715 26.5825 46.2128 24.1524 48.6446C22.005 50.8225 19.0685 52.0401 16.01 52.0209C12.4313 52.0209 9.01001 49.8966 9.01001 49.0208V49.0209Z"
			fill={props.fill}
		/>
	</svg>
)
const EmojiActivity: WebIconComponentType = ({
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
	return React.createElement(EmojiActivityIcon, {
		...otherProps,
		style: combinedStyle,
		width: size,
		height: size,
		fill,
	})
}
export default EmojiActivity
