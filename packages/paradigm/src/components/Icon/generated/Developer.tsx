import { useTheme } from "@tamagui/core"
import * as React from "react"

import { TextContext } from "../../Text"

import type { SVGProps } from "react"
import type { WebIconComponentType } from "../types"

const DeveloperIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 64 64"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>{"Developer"}</title>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M12.144 43.1825C9.56703 45.4138 9.28681 49.3116 11.5181 51.8886C13.7494 54.4655 17.6472 54.7457 20.2241 52.5144C20.449 52.3197 20.6595 52.109 20.854 51.884L35.1043 35.3834C35.3899 35.0599 35.8495 34.9536 36.2482 35.1188C38.4715 36.0013 40.8964 36.2486 43.2522 35.8331C48.408 34.9023 52.5101 30.9833 53.6754 25.8754C54.0193 24.3649 54.086 22.8045 53.8722 21.2702C53.7937 20.7214 53.2853 20.3401 52.7365 20.4185C52.518 20.4497 52.316 20.552 52.1616 20.7096L45.4046 27.6157C45.1532 27.8725 44.7833 27.9747 44.4357 27.8833L38.4393 26.3054C38.0909 26.2136 37.8188 25.9415 37.7271 25.5931L36.1492 19.5969C36.0576 19.2492 36.1599 18.8792 36.417 18.6279L43.3246 11.8714C43.7206 11.4835 43.7272 10.848 43.3393 10.452C43.1848 10.2943 42.9826 10.1919 42.764 10.1607H42.764C41.2267 9.94623 39.6632 10.0134 38.15 10.3588C33.0433 11.5268 29.1269 15.6304 28.1984 20.786V20.786C27.7842 23.1401 28.0318 25.5629 28.9136 27.7845C29.0801 28.1818 28.9747 28.6411 28.6516 28.926C26.2414 31.0075 16.507 39.4147 12.144 43.1825L12.144 43.1825ZM16.0084 51.0225C14.3521 51.0225 13.0093 49.6799 13.0093 48.0236C13.0092 46.3673 14.3519 45.0246 16.0082 45.0245C17.6645 45.0244 19.0072 46.3671 19.0073 48.0234C19.0073 48.0235 19.0073 48.0235 19.0073 48.0236V48.0241C19.0073 49.6803 17.6647 51.0229 16.0085 51.0229C16.0083 51.0229 16.0081 51.0229 16.0079 51.0229L16.0084 51.0225Z"
			fill={props.fill}
		/>
	</svg>
)
const Developer: WebIconComponentType = ({
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
	return React.createElement(DeveloperIcon, {
		...otherProps,
		style: combinedStyle,
		width: size,
		height: size,
		fill,
	})
}
export default Developer
