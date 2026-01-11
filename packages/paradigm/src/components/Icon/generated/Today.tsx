import { useTheme } from "@tamagui/core"
import * as React from "react"

import { TextContext } from "../../Text"

import type { SVGProps } from "react"
import type { WebIconComponentType } from "../types"

const TodayIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 64 64"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>{"Today"}</title>
		<path
			d="M17 12C17.5523 12 18 12.4477 18 13V13.8281L18.001 14.0244C18.0623 16.0412 19.5859 17.73 21.6074 17.9814C23.8062 18.1979 25.7639 16.5904 25.9805 14.3916C25.9933 14.2615 26 14.1308 26 14V13C26 12.4477 26.4477 12 27 12H37C37.5523 12 38 12.4477 38 13V13.8281L38.001 14.0244C38.0624 16.0411 39.586 17.7298 41.6074 17.9814C43.8061 18.1978 45.7638 16.5903 45.9805 14.3916C45.9933 14.2615 46 14.1308 46 14V13C46 12.4477 46.4477 12 47 12H50C52.2091 12 54 13.7909 54 16V50C54 52.2091 52.2091 54 50 54H14C11.7909 54 10 52.2091 10 50V16C10 13.7909 11.7909 12 14 12H17ZM15 28C14.4477 28 14 28.4477 14 29V49C14 49.5523 14.4477 50 15 50H49C49.5523 50 50 49.5523 50 49V29C50 28.4477 49.5523 28 49 28H15ZM22 36H18V32H22V36ZM22 8C23.1046 8 24 8.89543 24 10V14C24 15.1046 23.1046 16 22 16C20.8954 16 20 15.1046 20 14V10C20 8.89543 20.8954 8 22 8ZM42 8C43.1046 8 44 8.89543 44 10V14C44 15.1046 43.1046 16 42 16C40.8954 16 40 15.1046 40 14V10C40 8.89543 40.8954 8 42 8Z"
			fill={props.fill}
		/>
	</svg>
)
const Today: WebIconComponentType = ({
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
	return React.createElement(TodayIcon, {
		...otherProps,
		style: combinedStyle,
		width: size,
		height: size,
		fill,
	})
}
export default Today
