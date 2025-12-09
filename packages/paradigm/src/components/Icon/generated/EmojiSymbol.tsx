import { useTheme } from "@tamagui/core"
import * as React from "react"

import { TextContext } from "../../Text"

import type { SVGProps } from "react"
import type { WebIconComponentType } from "../types"

const EmojiSymbolIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 64 64"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>{"EmojiSymbol"}</title>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M48 54H16C12.6863 54 10 51.3137 10 48V16C10 12.6863 12.6863 10 16 10H48C51.3137 10 54 12.6863 54 16V48C54 51.3137 51.3137 54 48 54ZM29 17C29 15.8954 28.1046 15 27 15H17C15.8954 15 15 15.8954 15 17V27C15 28.1046 15.8954 29 17 29H27C28.1046 29 29 28.1046 29 27V17ZM30.3491 37.9843L24.7966 37.9949L23.0918 32.7564C22.8902 32.1541 22.2385 31.8294 21.6362 32.031C21.294 32.1456 21.0254 32.4142 20.9108 32.7564L19.206 37.9949L13.6528 37.9843C13.0254 37.9808 12.5139 38.4866 12.5104 39.1141C12.5084 39.4811 12.6837 39.8264 12.9812 40.0413L17.4779 43.2679L15.7526 48.5C15.5619 49.1028 15.896 49.7461 16.4988 49.9367C16.8451 50.0463 17.2227 49.985 17.5166 49.7717L22.0011 46.5274L26.4852 49.7717C26.9972 50.1432 27.7133 50.0293 28.0848 49.5173C28.298 49.2235 28.3592 48.8461 28.25 48.5L26.5242 43.2681L31.0211 40.0415C31.5299 39.6746 31.645 38.9646 31.278 38.4558C31.063 38.1576 30.7169 37.9819 30.3492 37.9843L30.3491 37.9843ZM49.8291 27.2666L43.0138 15.568C42.6823 15.0059 41.9578 14.819 41.3957 15.1506C41.2235 15.2521 41.0799 15.3958 40.9783 15.568L34.1629 27.2666C33.842 27.8246 34.0342 28.5371 34.5922 28.858C34.771 28.9608 34.9738 29.0143 35.18 29.0131H48.8115C49.4553 29.0169 49.9804 28.4981 49.9842 27.8543C49.9854 27.6481 49.932 27.4453 49.8293 27.2666L49.8291 27.2666ZM42 34C37.5817 34 34 37.5817 34 42C34 46.4183 37.5817 50 42 50C46.4183 50 50 46.4183 50 42C50 37.5817 46.4183 34 42 34Z"
			fill={props.fill}
		/>
	</svg>
)
const EmojiSymbol: WebIconComponentType = ({
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
	return React.createElement(EmojiSymbolIcon, {
		...otherProps,
		style: combinedStyle,
		width: size,
		height: size,
		fill,
	})
}
export default EmojiSymbol
