import { useTheme } from "@tamagui/core"
import * as React from "react"

import { TextContext } from "../../Text"

import type { SVGProps } from "react"
import type { WebIconComponentType } from "../types"

const StormIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 64 64"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>{"Storm"}</title>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M53.9865 29.6V29.6C53.5731 33.2782 50.4339 36.0411 46.733 35.984H38.2641C37.9879 35.9841 37.764 35.7603 37.7639 35.4842C37.7639 35.4433 37.7689 35.4026 37.7788 35.363L38.8853 30.9387C39.4198 28.7979 38.1177 26.6291 35.9769 26.0945C35.6595 26.0153 35.3337 25.9753 35.0066 25.9755H27.2966C25.0031 25.975 23.0035 27.5354 22.4466 29.7602L21.0325 35.416C20.949 35.7499 20.6489 35.9841 20.3047 35.984H19.3179C14.3477 36.049 10.2224 32.1589 9.99588 27.1934V27.1934C9.89127 22.5143 13.3908 18.5362 18.045 18.0434V18.0434C18.5686 11.9938 23.8972 7.514 29.9469 8.0376C33.4901 8.34427 36.6662 10.3459 38.4716 13.41C42.6306 11.9855 47.1569 14.2022 48.5814 18.3612C49.0127 19.6205 49.1213 20.9679 48.8974 22.28C52.1358 23.1751 54.2753 26.2525 53.9865 29.6H53.9865ZM24.36 30.2473C24.694 28.9112 25.8945 27.9739 27.2717 27.9739H34.9947C36.0999 27.9741 36.9956 28.8702 36.9954 29.9753C36.9954 30.1387 36.9754 30.3015 36.9358 30.46L35.0558 37.9785H40.9974C42.1025 37.9787 42.9982 38.8747 42.9981 39.9798C42.998 40.4847 42.807 40.971 42.4635 41.341L29.4576 55.348C28.7056 56.1579 27.4395 56.2048 26.6297 55.4528C26.0952 54.9565 25.8731 54.2087 26.05 53.5011L27.93 45.9827H22.9888C21.8835 45.9825 20.9877 45.0864 20.9879 43.9812C20.9879 43.8177 21.0079 43.6549 21.0476 43.4963L24.36 30.2473Z"
			fill={props.fill}
		/>
	</svg>
)
const Storm: WebIconComponentType = ({
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
	return React.createElement(StormIcon, {
		...otherProps,
		style: combinedStyle,
		width: size,
		height: size,
		fill,
	})
}
export default Storm
