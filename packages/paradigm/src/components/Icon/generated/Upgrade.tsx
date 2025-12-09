import { useTheme } from "@tamagui/core"
import * as React from "react"

import { TextContext } from "../../Text"

import type { SVGProps } from "react"
import type { WebIconComponentType } from "../types"

const UpgradeIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 64 64"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>{"Upgrade"}</title>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M40 42.0313V42.0326C40 43.3003 39.7109 44.5512 39.1547 45.6903L38.4139 47.1719C38.1597 47.6794 37.6407 47.9999 37.073 48H26.927C26.3589 47.9999 25.8396 47.6789 25.5855 47.1708L24.8447 45.6891C24.2887 44.5499 23.9998 43.2989 24 42.0313L18.28 47.7508C17.9869 48.0435 17.5121 48.0432 17.2193 47.7501C17.0789 47.6095 17 47.4188 17 47.22V40.6882V40.6886C17 39.6278 17.4213 38.6105 18.1712 37.8603L23.7068 32.3248C23.8946 32.1372 24.0001 31.8826 24 31.6171V24C24 11.3143 29 6 32 6C35 6 40 11.3143 40 24V31.617V31.6169C40 31.8821 40.1053 32.1364 40.2928 32.3239L45.8285 37.86C46.5786 38.6101 47 39.6274 47 40.6882V47.2207V47.2207C46.9997 47.6349 46.6636 47.9704 46.2494 47.97C46.0508 47.9699 45.8605 47.891 45.72 47.7507L40 42.0313ZM32 50C34.3465 50.1389 36.1364 52.1534 35.9983 54.5C35.9983 57.355 33.3151 62 32 62C30.6849 62 28.0015 57.355 28.0015 54.5C27.8634 52.1534 29.6534 50.1389 32 50Z"
			fill={props.fill}
		/>
	</svg>
)
const Upgrade: WebIconComponentType = ({
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
	return React.createElement(UpgradeIcon, {
		...otherProps,
		style: combinedStyle,
		width: size,
		height: size,
		fill,
	})
}
export default Upgrade
