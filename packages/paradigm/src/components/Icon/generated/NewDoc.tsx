import { useTheme } from "@tamagui/core"
import * as React from "react"

import { TextContext } from "../../Text"

import type { SVGProps } from "react"
import type { WebIconComponentType } from "../types"

const NewDocIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 64 64"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>{"NewDoc"}</title>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M52.4599 16.7786C52.1666 17.0706 51.6925 17.0706 51.3992 16.7786L47.2085 12.6022C46.9166 12.3118 46.9153 11.8397 47.2057 11.5478L47.2085 11.545L50.1032 8.65692C50.9831 7.78103 52.4054 7.78102 53.2853 8.65692L55.3545 10.7189C56.2303 11.5908 56.2336 13.0075 55.3618 13.8834C55.3593 13.8858 55.3569 13.8882 55.3545 13.8906L52.4599 16.7786ZM29.748 38.4853L24.7018 40.0005C24.4043 40.0896 24.0909 39.9207 24.0018 39.6232C23.9703 39.518 23.9703 39.4058 24.0018 39.3005L25.5166 34.2465C25.8016 33.2953 26.3182 32.4297 27.0199 31.7271L44.5231 14.2107C44.8159 13.9183 45.2903 13.9183 45.5831 14.2107L49.7707 18.4018C50.0634 18.6949 50.0634 19.1697 49.7707 19.4628L32.2684 36.9785C31.566 37.6818 30.6999 38.1995 29.748 38.4853ZM51.9999 29.0153V46.0162C51.9969 49.329 49.3128 52.014 46 52.0183H18C14.6872 52.0141 12.0031 49.329 12 46.0162V18.0099C12.003 14.6972 14.6871 12.0122 17.9999 12.0079H34.9999C36.1048 12.0079 37.0006 12.9037 37.0006 14.0086C37.0006 15.1136 36.1048 16.0093 34.9999 16.0093H17.9999C16.8956 16.0106 16.0008 16.9056 15.9999 18.0099V46.0162C16.0008 47.1205 16.8956 48.0155 17.9999 48.0168H45.9999C47.1041 48.0153 47.9987 47.1204 47.9999 46.0162V29.0153C47.9999 27.9108 48.8953 27.0153 49.9999 27.0153C51.1045 27.0153 51.9999 27.9107 51.9999 29.0153Z"
			fill={props.fill}
		/>
	</svg>
)
const NewDoc: WebIconComponentType = ({
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
	return React.createElement(NewDocIcon, {
		...otherProps,
		style: combinedStyle,
		width: size,
		height: size,
		fill,
	})
}
export default NewDoc
