import { useTheme } from "@tamagui/core"
import * as React from "react"

import { TextContext } from "../../Text"

import type { SVGProps } from "react"
import type { WebIconComponentType } from "../types"

const ArchiveIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 64 64"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>{"Archive"}</title>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M52 20H12C10.8954 20 10 19.1046 10 18V14V14C10 12.8954 10.8954 12 12 12H52C53.1046 12 54 12.8954 54 14V18C54 19.1046 53.1046 20 52 20ZM50 22C50.5523 22 51 22.4477 51 23V49C51 50.6568 49.6568 52 48 52H16C14.3432 52 13 50.6568 13 49V23C13 22.4477 13.4477 22 14 22H50ZM26 32H38C39.1046 32 40 31.1046 40 30C40 28.8954 39.1046 28 38 28H26C24.8954 28 24 28.8954 24 30C24 31.1046 24.8954 32 26 32Z"
			fill={props.fill}
		/>
	</svg>
)
const Archive: WebIconComponentType = ({
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
	return React.createElement(ArchiveIcon, {
		...otherProps,
		style: combinedStyle,
		width: size,
		height: size,
		fill,
	})
}
export default Archive
