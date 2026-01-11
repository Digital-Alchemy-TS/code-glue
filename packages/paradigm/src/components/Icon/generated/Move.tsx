import { useTheme } from "@tamagui/core"
import * as React from "react"

import { TextContext } from "../../Text"

import type { SVGProps } from "react"
import type { WebIconComponentType } from "../types"

const MoveIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 64 64"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>{"Move"}</title>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M38.4276 48.4568C37.6464 49.2389 36.3791 49.2397 35.5969 48.4585C34.8148 47.6773 34.814 46.41 35.5952 45.6278L47.2162 34.0209H12.01C10.9054 34.0209 10.01 33.1255 10.01 32.0209C10.01 30.9163 10.9054 30.0209 12.01 30.0209H47.1823L35.5952 18.4478C34.814 17.6657 34.8148 16.3983 35.5969 15.6171C36.3791 14.8359 37.6464 14.8367 38.4276 15.6188L53.45 30.6233C54.2312 31.4029 54.2326 32.6682 53.4529 33.4495C53.452 33.4504 53.451 33.4514 53.45 33.4524L38.4276 48.4568Z"
			fill={props.fill}
		/>
	</svg>
)
const Move: WebIconComponentType = ({
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
	return React.createElement(MoveIcon, {
		...otherProps,
		style: combinedStyle,
		width: size,
		height: size,
		fill,
	})
}
export default Move
