import { useTheme } from "@tamagui/core"
import * as React from "react"

import { TextContext } from "../../Text"

import type { SVGProps } from "react"
import type { WebIconComponentType } from "../types"

const StatusIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 64 64"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>{"Status"}</title>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M37.9998 14.1428C39.2548 14.1428 40.3788 14.8776 40.8232 15.9884L46.0849 29.1428H52.9998C54.6671 29.1428 56.0187 30.422 56.0187 32C56.0187 33.5779 54.6671 34.8571 52.9998 34.8571H43.9998C42.7449 34.8571 41.6208 34.1223 41.1765 33.0115L37.9998 25.0698L28.8232 48.0115C28.3788 49.1223 27.2548 49.8571 25.9998 49.8571C24.7449 49.8571 23.6208 49.1223 23.1765 48.0115L17.9147 34.8571H10.9998C9.33255 34.8571 7.98096 33.5779 7.98096 32C7.98096 30.422 9.33255 29.1428 10.9998 29.1428H19.9998C21.2548 29.1428 22.3788 29.8776 22.8232 30.9884L25.9998 38.9301L35.1765 15.9884C35.6208 14.8776 36.7449 14.1428 37.9998 14.1428Z"
			fill={props.fill}
		/>
	</svg>
)
const Status: WebIconComponentType = ({
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
	return React.createElement(StatusIcon, {
		...otherProps,
		style: combinedStyle,
		width: size,
		height: size,
		fill,
	})
}
export default Status
