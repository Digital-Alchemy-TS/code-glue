import { useTheme } from "@tamagui/core"
import * as React from "react"

import { TextContext } from "../../Text"

import type { SVGProps } from "react"
import type { WebIconComponentType } from "../types"

const AppleIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 64 64"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>{"Apple"}</title>
		<path
			d="M32.3239 20.9231C33.5341 20.9231 35.0511 20.0798 35.9545 18.9553C36.7727 17.9363 37.3693 16.5132 37.3693 15.0901C37.3693 14.8969 37.3523 14.7036 37.3182 14.5455C35.9716 14.5982 34.3523 15.4766 33.3807 16.6538C32.6136 17.5498 31.9148 18.9553 31.9148 20.396C31.9148 20.6068 31.9489 20.8177 31.9659 20.888C32.0511 20.9055 32.1875 20.9231 32.3239 20.9231ZM28.0625 42.1818C29.7159 42.1818 30.4489 41.0398 32.5114 41.0398C34.608 41.0398 35.0682 42.1467 36.9091 42.1467C38.7159 42.1467 39.9261 40.4249 41.0682 38.7383C42.3466 36.8057 42.875 34.9082 42.9091 34.8203C42.7898 34.7852 39.3295 33.327 39.3295 29.2333C39.3295 25.6843 42.0568 24.0856 42.2102 23.9626C40.4034 21.292 37.6591 21.2218 36.9091 21.2218C34.8807 21.2218 33.2273 22.4868 32.1875 22.4868C31.0625 22.4868 29.5795 21.292 27.8239 21.292C24.483 21.292 21.0909 24.1383 21.0909 29.5144C21.0909 32.8526 22.3523 36.384 23.9034 38.668C25.233 40.6006 26.392 42.1818 28.0625 42.1818Z"
			fill={props.fill}
		/>
	</svg>
)
const Apple: WebIconComponentType = ({
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
	return React.createElement(AppleIcon, {
		...otherProps,
		style: combinedStyle,
		width: size,
		height: size,
		fill,
	})
}
export default Apple
