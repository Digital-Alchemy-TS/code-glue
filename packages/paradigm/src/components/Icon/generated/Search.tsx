import { useTheme } from "@tamagui/core"
import * as React from "react"

import { TextContext } from "../../Text"

import type { SVGProps } from "react"
import type { WebIconComponentType } from "../types"

const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 64 64"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>{"Search"}</title>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M17.4956 42.2508C23.7949 48.5504 33.6655 49.1037 40.5918 43.9104L46.4496 49.7684C47.2306 50.5495 48.4969 50.5495 49.278 49.7684L50.0223 49.0241C50.8033 48.2431 50.8033 46.9767 50.0223 46.1957L44.1641 40.3377C49.3569 33.4109 48.8042 23.541 42.5044 17.2415C35.5986 10.3354 24.4014 10.3354 17.4956 17.2415C10.5894 24.1476 10.5894 35.3446 17.4956 42.2508ZM40.3833 40.1295C34.6489 45.864 25.3511 45.864 19.6167 40.1295C13.8823 34.3948 13.8823 25.0974 19.6167 19.3629C25.3511 13.6282 34.6489 13.6282 40.3833 19.3629C46.1177 25.0974 46.1177 34.3948 40.3833 40.1295Z"
			fill={props.fill}
		/>
	</svg>
)
const Search: WebIconComponentType = ({
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
	return React.createElement(SearchIcon, {
		...otherProps,
		style: combinedStyle,
		width: size,
		height: size,
		fill,
	})
}
export default Search
