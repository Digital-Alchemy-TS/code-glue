import { useTheme } from "@tamagui/core"
import * as React from "react"

import { TextContext } from "../../Text"

import type { SVGProps } from "react"
import type { WebIconComponentType } from "../types"

const LabsIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 64 64"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>{"Labs"}</title>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M40.0497 28.78L51.5018 49.0318C52.5888 50.955 51.911 53.3953 49.9878 54.4823C49.3868 54.822 48.7081 55.0003 48.0177 55H16.0018C13.7927 55.001 12.001 53.211 12 51.0018C11.9997 50.3115 12.178 49.6328 12.5177 49.0318L23.9697 28.78C24.6488 27.5791 25.0057 26.223 25.0057 24.8434V13H24.0097C22.9052 13 22.0097 12.1046 22.0097 11C22.0097 9.89543 22.9052 9 24.0097 9H40.0102C41.1148 9 42.0102 9.89543 42.0102 11C42.0102 12.1046 41.1148 13 40.0102 13H39.0134V24.8433V24.843C39.0134 26.2226 39.3704 27.5788 40.0496 28.7797L40.0497 28.78ZM35.0097 13H29.0097V24.8434V24.8431C29.0097 26.9124 28.4747 28.9465 27.4565 30.7479L25.4751 34.254C25.3393 34.4944 25.424 34.7994 25.6644 34.9353C25.7394 34.9777 25.8241 35 25.9102 35H38.1097C38.3859 35.0001 38.6098 34.7762 38.6098 34.5001C38.6098 34.4139 38.5876 34.3291 38.5451 34.254L36.5634 30.7481C35.5451 28.9467 35.0099 26.9127 35.0097 24.8434V13Z"
			fill={props.fill}
		/>
	</svg>
)
const Labs: WebIconComponentType = ({
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
	return React.createElement(LabsIcon, {
		...otherProps,
		style: combinedStyle,
		width: size,
		height: size,
		fill,
	})
}
export default Labs
