import { useTheme } from "@tamagui/core"
import * as React from "react"

import { TextContext } from "../../Text"

import type { SVGProps } from "react"
import type { WebIconComponentType } from "../types"

const TrashIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 64 64"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>{"Trash"}</title>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M49.01 20.0208H15.01C13.9054 20.0208 13.01 19.1254 13.01 18.0208V16.0208C13.01 14.9162 13.9054 14.0208 15.01 14.0208H21.01C21.01 11.0894 21.6254 9.3782 22.9946 8.0087C24.3638 6.6392 26.0706 6.0233 29.0009 6.0233H35.02C37.95 6.0233 39.6571 6.639 41.0261 8.0087C42.3951 9.3784 43.01 11.0894 43.01 14.0208H49.01C50.1146 14.0208 51.01 14.9162 51.01 16.0208V18.0208C51.01 19.1254 50.1146 20.0208 49.01 20.0208ZM38.0177 11.0148C37.2058 10.2678 36.1117 9.90613 35.0145 10.022H29.0058C27.9087 9.90619 26.8147 10.2678 26.0028 11.0148C25.2561 11.828 24.8947 12.9228 25.0105 14.0208H39.0105C39.1264 12.9228 38.7649 11.828 38.0182 11.0148H38.0177ZM47.0002 22.0208C47.5533 22.0196 48.0026 22.467 48.0038 23.02C48.0038 23.0411 48.0032 23.0622 48.0019 23.0832L46.2382 51.2079C46.136 52.7919 44.82 54.0235 43.2327 54.0208H20.7855H20.7855C19.1983 54.0235 17.8823 52.7919 17.78 51.2079L16.0157 23.0832V23.0832C15.9822 22.5309 16.4028 22.0561 16.9551 22.0226C16.9759 22.0214 16.9968 22.0208 17.0176 22.0208L47.0002 22.0208Z"
			fill={props.fill}
		/>
	</svg>
)
const Trash: WebIconComponentType = ({
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
	return React.createElement(TrashIcon, {
		...otherProps,
		style: combinedStyle,
		width: size,
		height: size,
		fill,
	})
}
export default Trash
