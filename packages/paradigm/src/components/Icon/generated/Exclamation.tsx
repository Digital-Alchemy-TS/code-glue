import { useTheme } from "@tamagui/core"
import * as React from "react"

import { TextContext } from "../../Text"

import type { SVGProps } from "react"
import type { WebIconComponentType } from "../types"

const ExclamationIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 64 64"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>{"Exclamation"}</title>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M33.7855 40.9967H30.2155C29.3436 41.0249 28.6005 40.3697 28.5193 39.5012L27.0003 12.6628V12.6628C26.9843 11.7605 27.7028 11.0162 28.605 11.0003C28.6353 10.9997 28.6656 11 28.6959 11.0012H35.3052C36.2072 10.9672 36.966 11.671 36.9999 12.5731C37.0011 12.603 37.0014 12.633 37.0009 12.663L35.4816 39.5012C35.4003 40.3696 34.6572 41.0248 33.7855 40.9967ZM31.9893 44.9988C34.1984 44.9988 35.9893 46.7896 35.9893 48.9988C35.9893 51.2079 34.1984 52.9988 31.9893 52.9988C29.7801 52.9988 27.9893 51.2079 27.9893 48.9988V48.9988C27.9893 46.7896 29.7801 44.9988 31.9893 44.9988V44.9988Z"
			fill={props.fill}
		/>
	</svg>
)
const Exclamation: WebIconComponentType = ({
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
	return React.createElement(ExclamationIcon, {
		...otherProps,
		style: combinedStyle,
		width: size,
		height: size,
		fill,
	})
}
export default Exclamation
