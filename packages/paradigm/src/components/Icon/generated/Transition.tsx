import { useTheme } from "@tamagui/core"
import * as React from "react"

import { TextContext } from "../../Text"

import type { SVGProps } from "react"
import type { WebIconComponentType } from "../types"

const TransitionIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 64 64"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>{"Transition"}</title>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M35.2844 48.539C34.4342 49.247 33.171 49.1317 32.463 48.2814C32.164 47.9224 32 47.4701 31.9992 47.0028V39.0209H12.01C10.9054 39.0209 10.01 38.1255 10.01 37.0209V27.0209C10.01 25.9163 10.9054 25.0209 12.01 25.0209H31.9992V17.006V17.006C32.001 15.8997 32.8993 15.0043 34.0056 15.0061C34.473 15.0068 34.9253 15.1709 35.2844 15.47L53.3112 30.4679C54.1597 31.1734 54.2756 32.433 53.5701 33.2815C53.4919 33.3755 53.4053 33.4622 53.3112 33.5404L35.2844 48.539Z"
			fill={props.fill}
		/>
	</svg>
)
const Transition: WebIconComponentType = ({
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
	return React.createElement(TransitionIcon, {
		...otherProps,
		style: combinedStyle,
		width: size,
		height: size,
		fill,
	})
}
export default Transition
