import { useTheme } from "@tamagui/core"
import * as React from "react"

import { TextContext } from "../../Text"

import type { SVGProps } from "react"
import type { WebIconComponentType } from "../types"

const ComputerIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 64 64"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>{"Computer"}</title>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M55 37H9C8.44772 37 8 36.5523 8 36V14V14C8 11.2386 10.2386 9 13 9H51C53.7614 9 56 11.2386 56 14V36C56 36.5523 55.5523 37 55 37ZM9 39H55C55.5523 39 56 39.4477 56 40C56 42.7614 53.7614 45 51 45H13C10.2386 45 8 42.7614 8 40C8 39.4477 8.44772 39 9 39ZM21 53C23.0249 52.6561 24.3743 51.8543 25 48C25.0331 47.462 25.462 47.0331 26 47H38C38.538 47.0331 38.9669 47.462 39 48C39.625 51.8542 40.975 52.6561 43 53C43.5372 53.0348 43.9652 53.4628 44 54C44 54.5523 43.5523 55 43 55H21C20.4477 55 20 54.5523 20 54C20.0346 53.4627 20.4627 53.0346 21 53Z"
			fill={props.fill}
		/>
	</svg>
)
const Computer: WebIconComponentType = ({
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
	return React.createElement(ComputerIcon, {
		...otherProps,
		style: combinedStyle,
		width: size,
		height: size,
		fill,
	})
}
export default Computer
