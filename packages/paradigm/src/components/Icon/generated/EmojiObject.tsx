import { useTheme } from "@tamagui/core"
import * as React from "react"

import { TextContext } from "../../Text"

import type { SVGProps } from "react"
import type { WebIconComponentType } from "../types"

const EmojiObjectIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 64 64"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>{"EmojiObject"}</title>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M62 47C62 48.6568 60.6568 50 59 50H5C3.34315 50 2 48.6568 2 47V23C2 21.3431 3.34315 20 5 20H9V15V15C9 12.2386 11.2386 10 14 10H50C52.7614 10 55 12.2386 55 15V20H59C60.6568 20 62 21.3432 62 23V47ZM26 36C26 37.1046 26.8954 38 28 38H36C37.1046 38 38 37.1046 38 36V30C38 28.8954 37.1046 28 36 28H28C26.8954 28 26 28.8954 26 30V36ZM5 35C5 39.9706 9.02944 44 14 44C18.9706 44 23 39.9706 23 35C23 30.0294 18.9706 26 14 26C9.02944 26 5 30.0294 5 35ZM51 15C51 14.4477 50.5523 14 50 14H14C13.4477 14 13 14.4477 13 15V20H18C18 18.8954 18.8954 18 20 18H24C25.1046 18 26 18.8954 26 20H28C28 18.8954 28.8954 18 30 18H34C35.1046 18 36 18.8954 36 20H38C38 18.8954 38.8954 18 40 18H44C45.1046 18 46 18.8954 46 20H51V15ZM50 26C45.0294 26 41 30.0294 41 35C41 39.9706 45.0294 44 50 44C54.9706 44 59 39.9706 59 35C59 30.0294 54.9706 26 50 26ZM50 38C48.3432 38 47 36.6569 47 35C47 33.3431 48.3432 32 50 32C51.6568 32 53 33.3431 53 35C53 36.6569 51.6568 38 50 38ZM17 35C17 36.6569 15.6568 38 14 38C12.3432 38 11 36.6569 11 35C11 33.3431 12.3432 32 14 32C15.6568 32 17 33.3431 17 35Z"
			fill={props.fill}
		/>
	</svg>
)
const EmojiObject: WebIconComponentType = ({
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
	return React.createElement(EmojiObjectIcon, {
		...otherProps,
		style: combinedStyle,
		width: size,
		height: size,
		fill,
	})
}
export default EmojiObject
