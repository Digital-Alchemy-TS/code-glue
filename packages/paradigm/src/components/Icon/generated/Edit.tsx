import { useTheme } from "@tamagui/core"
import * as React from "react"

import { TextContext } from "../../Text"

import type { SVGProps } from "react"
import type { WebIconComponentType } from "../types"

const EditIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 64 64"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>{"Edit"}</title>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M10.0316 53.0648L12.0492 46.3265C12.4289 45.0585 13.1171 43.9045 14.0522 42.9678L39.6998 17.281C40.0891 16.891 40.7208 16.8903 41.1108 17.2796C41.1113 17.28 41.1117 17.2805 41.1122 17.281L46.6905 22.8688C47.0805 23.2597 47.0805 23.8925 46.6905 24.2834L21.044 49.9694C20.1085 50.9066 18.9548 51.5967 17.6866 51.9778L10.9644 53.9978C10.5681 54.1167 10.1504 53.8917 10.0316 53.4954C9.98946 53.355 9.98947 53.2052 10.0316 53.0648ZM50.345 10.876L53.0908 13.6253C54.2569 14.7937 54.2569 16.6855 53.0908 17.8539L49.7442 21.2046C49.3565 21.5932 48.7271 21.594 48.3385 21.2063C48.3379 21.2057 48.3374 21.2052 48.3368 21.2046L42.7761 15.6363V15.6363C42.3872 15.2467 42.3872 14.6159 42.7761 14.2263L46.1228 10.8756C47.2863 9.70978 49.1746 9.7079 50.3404 10.8714C50.342 10.8729 50.3435 10.8745 50.345 10.876Z"
			fill={props.fill}
		/>
	</svg>
)
const Edit: WebIconComponentType = ({
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
	return React.createElement(EditIcon, {
		...otherProps,
		style: combinedStyle,
		width: size,
		height: size,
		fill,
	})
}
export default Edit
