import { useTheme } from "@tamagui/core"
import * as React from "react"

import { TextContext } from "../../Text"

import type { SVGProps } from "react"
import type { WebIconComponentType } from "../types"

const CarouselIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 64 64"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>{"Carousel"}</title>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M48 52H16C14.3432 52 13 50.6568 13 49V15C13 13.3432 14.3432 12 16 12H48C49.6568 12 51 13.3432 51 15V49C51 50.6568 49.6568 52 48 52ZM54 49C53.4477 49 53 48.5523 53 48V16C53 15.4477 53.4477 15 54 15C55.6568 15 57 16.3432 57 18V46C56.9999 47.6568 55.6568 49 54 49Z"
			fill={props.fill}
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M10 15C10.5523 15 11 15.4477 11 16V48C11 48.5523 10.5523 49 10 49C8.34315 49 7 47.6568 7 46V18C7.00005 16.3432 8.34318 15 10 15Z"
			fill={props.fill}
		/>
	</svg>
)
const Carousel: WebIconComponentType = ({
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
	return React.createElement(CarouselIcon, {
		...otherProps,
		style: combinedStyle,
		width: size,
		height: size,
		fill,
	})
}
export default Carousel
