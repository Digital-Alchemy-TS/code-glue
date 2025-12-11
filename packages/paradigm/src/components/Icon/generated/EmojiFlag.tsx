import { useTheme } from "@tamagui/core"
import * as React from "react"

import { TextContext } from "../../Text"

import type { SVGProps } from "react"
import type { WebIconComponentType } from "../types"

const EmojiFlagIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 64 64"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>{"EmojiFlag"}</title>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M54.0208 40.5839C43.3541 42.3096 32.6874 38.0654 22.0208 39.7911C21.1503 40.0008 20.2747 39.4651 20.0651 38.5946C20.0311 38.4536 20.0162 38.3087 20.0208 38.1637C20.0485 36.992 20.8752 35.9917 22.0208 35.7437V15.5053C21.1504 15.715 20.2748 15.1794 20.0651 14.309C20.0311 14.168 20.0162 14.023 20.0208 13.878V13.878C20.0486 12.7063 20.8753 11.706 22.0208 11.458C32.6875 9.73232 43.3542 13.9766 54.0208 12.2509C54.8913 12.0413 55.7669 12.577 55.9765 13.4474C56.0105 13.5884 56.0254 13.7334 56.0208 13.8783V38.1637C55.9931 39.3355 55.1664 40.3359 54.0208 40.5839L54.0208 40.5839ZM14.0208 56.0208V12.0208V12.0208C14.0208 10.9162 14.9162 10.0208 16.0208 10.0208C17.1254 10.0208 18.0208 10.9162 18.0208 12.0208V56.0208C18.0208 57.1254 17.1254 58.0208 16.0208 58.0208C14.9162 58.0208 14.0208 57.1254 14.0208 56.0208Z"
			fill={props.fill}
		/>
	</svg>
)
const EmojiFlag: WebIconComponentType = ({
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
	return React.createElement(EmojiFlagIcon, {
		...otherProps,
		style: combinedStyle,
		width: size,
		height: size,
		fill,
	})
}
export default EmojiFlag
