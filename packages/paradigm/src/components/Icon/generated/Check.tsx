import { useTheme } from "@tamagui/core"
import * as React from "react"

import { TextContext } from "../../Text"

import type { SVGProps } from "react"
import type { WebIconComponentType } from "../types"

const CheckIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 64 64"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>{"Check"}</title>
		<path
			d="M19.9364 45.4904C21.5841 47.4986 24.6766 47.4358 26.2415 45.3624C28.2668 42.6788 32.3548 38.5764 36.8205 34.8172C41.8311 30.5993 46.7325 27.2807 50.4255 25.7044C52.4638 24.8344 53.4108 22.4768 52.5408 20.4385C51.6708 18.4002 49.3132 17.4532 47.275 18.3232C42.7185 20.268 37.2171 23.9928 31.652 28.6775C26.763 32.7931 23.704 37.3226 23.4879 37.041C22.3097 35.506 18.3269 30.0821 18.3037 30.0496C16.9877 28.2098 14.4813 27.7936 12.6787 29.0828C10.8761 30.3721 10.4599 32.8785 11.7492 34.6811C11.8062 34.7607 19.2763 44.686 19.9364 45.4904Z"
			fill={props.fill}
		/>
	</svg>
)
const Check: WebIconComponentType = ({
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
	return React.createElement(CheckIcon, {
		...otherProps,
		style: combinedStyle,
		width: size,
		height: size,
		fill,
	})
}
export default Check
