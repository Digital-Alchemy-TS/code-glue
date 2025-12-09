import { useTheme } from "@tamagui/core"
import * as React from "react"

import { TextContext } from "../../Text"

import type { SVGProps } from "react"
import type { WebIconComponentType } from "../types"

const PhoneIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 64 64"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>{"Phone"}</title>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M42 56H22C19.2386 56 17 53.7614 17 51V13V13C17 10.2386 19.2386 8 22 8H42C44.7614 8 47 10.2386 47 13V51C47 53.7614 44.7614 56 42 56ZM32 46C30.3432 46 29 47.3432 29 49C29 50.6568 30.3432 52 32 52C33.6569 52 35 50.6568 35 49C35 47.3432 33.6569 46 32 46Z"
			fill={props.fill}
		/>
	</svg>
)
const Phone: WebIconComponentType = ({
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
	return React.createElement(PhoneIcon, {
		...otherProps,
		style: combinedStyle,
		width: size,
		height: size,
		fill,
	})
}
export default Phone
