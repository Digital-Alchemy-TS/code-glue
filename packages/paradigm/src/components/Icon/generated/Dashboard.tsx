import { useTheme } from "@tamagui/core"
import * as React from "react"

import { TextContext } from "../../Text"

import type { SVGProps } from "react"
import type { WebIconComponentType } from "../types"

const DashboardIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 64 64"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>{"Dashboard"}</title>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M50.7 54H37.5C35.6775 54 34.2 52.5225 34.2 50.7V37.5C34.2 35.6775 35.6775 34.2 37.5 34.2H50.7C52.5225 34.2 54 35.6775 54 37.5V50.7C54 52.5225 52.5225 54 50.7 54ZM50.7 29.8H37.5C35.6775 29.8 34.2 28.3225 34.2 26.5V13.3C34.2 11.4775 35.6775 10 37.5 10H50.7C52.5225 10 54 11.4775 54 13.3V26.5C54 28.3225 52.5225 29.8 50.7 29.8ZM13.3 34.2H26.5C28.3225 34.2 29.8 35.6775 29.8 37.5V50.7C29.8 52.5225 28.3225 54 26.5 54H13.3C11.4775 54 10 52.5225 10 50.7V37.5C10 35.6775 11.4775 34.2 13.3 34.2ZM10 13.3C10 11.4775 11.4775 10 13.3 10H26.5C28.3225 10 29.8 11.4775 29.8 13.3V26.5C29.8 28.3225 28.3225 29.8 26.5 29.8H13.3C11.4775 29.8 10 28.3225 10 26.5V13.3Z"
			fill={props.fill}
		/>
	</svg>
)
const Dashboard: WebIconComponentType = ({
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
	return React.createElement(DashboardIcon, {
		...otherProps,
		style: combinedStyle,
		width: size,
		height: size,
		fill,
	})
}
export default Dashboard
