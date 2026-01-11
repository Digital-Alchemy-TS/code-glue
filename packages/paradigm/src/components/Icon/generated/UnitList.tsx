import { useTheme } from "@tamagui/core"
import * as React from "react"

import { TextContext } from "../../Text"

import type { SVGProps } from "react"
import type { WebIconComponentType } from "../types"

const UnitListIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 64 64"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>{"UnitList"}</title>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M52 21V53C52 54.6568 50.6568 56 49 56H15C13.3432 56 12 54.6568 12 53V21C12 19.3431 13.3432 18 15 18H49C50.6568 18 52 19.3431 52 21V21V21ZM19 10C18.4477 10 18 9.55228 18 9V9C18 7.34315 19.3432 6 21 6H43C44.6569 6 46 7.34315 46 9C46 9.55228 45.5523 10 45 10L19 10ZM49 15C49 15.5523 48.5523 16 48 16H16C15.4477 16 15 15.5523 15 15V15C15 13.3432 16.3432 12 18 12H46C47.6568 12.0001 48.9999 13.3432 48.9999 15L49 15Z"
			fill={props.fill}
		/>
	</svg>
)
const UnitList: WebIconComponentType = ({
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
	return React.createElement(UnitListIcon, {
		...otherProps,
		style: combinedStyle,
		width: size,
		height: size,
		fill,
	})
}
export default UnitList
