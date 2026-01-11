import { useTheme } from "@tamagui/core"
import * as React from "react"

import { TextContext } from "../../Text"

import type { SVGProps } from "react"
import type { WebIconComponentType } from "../types"

const NoIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 64 64"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>{"No"}</title>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M32 56C18.7452 56 8 45.2548 8 32C8 18.7452 18.7452 8 32 8C45.2548 8 56 18.7452 56 32C56 45.2548 45.2548 56 32 56ZM16.5113 19.3522L16.5113 19.3522C9.5238 27.9042 10.792 40.5014 19.344 47.4889C26.7061 53.5042 37.2857 53.5043 44.6478 47.489L16.5113 19.3522ZM52.0008 31.9999V31.9964C52.0008 20.9523 43.0478 11.9993 32.0037 11.9993C27.386 11.9993 22.9105 13.5974 19.3373 16.5223L47.4773 44.6623C50.4077 41.0937 52.0067 36.6175 52.0008 31.9999L52.0008 31.9999Z"
			fill={props.fill}
		/>
	</svg>
)
const No: WebIconComponentType = ({
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
	return React.createElement(NoIcon, {
		...otherProps,
		style: combinedStyle,
		width: size,
		height: size,
		fill,
	})
}
export default No
