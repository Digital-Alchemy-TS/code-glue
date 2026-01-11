import { useTheme } from "@tamagui/core"
import * as React from "react"

import { TextContext } from "../../Text"

import type { SVGProps } from "react"
import type { WebIconComponentType } from "../types"

const ChevronRightIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 64 64"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>{"ChevronRight"}</title>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M21.6985 50.605C20.7672 49.6694 20.7672 48.1514 21.6985 47.2183L36.8622 31.9855L21.716 16.7725C20.7872 15.8394 20.7872 14.3238 21.716 13.3907L23.4009 11.6998C24.3297 10.7667 25.8368 10.7667 26.7656 11.6998L45.3015 30.2823C46.2328 31.2178 46.2328 32.7334 45.3015 33.669L26.7556 52.2983C25.8268 53.2339 24.3146 53.2339 23.3858 52.2983L21.6985 50.605Z"
			fill={props.fill}
		/>
	</svg>
)
const ChevronRight: WebIconComponentType = ({
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
	return React.createElement(ChevronRightIcon, {
		...otherProps,
		style: combinedStyle,
		width: size,
		height: size,
		fill,
	})
}
export default ChevronRight
