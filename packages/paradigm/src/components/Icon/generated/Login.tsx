import { useTheme } from "@tamagui/core"
import * as React from "react"

import { TextContext } from "../../Text"

import type { SVGProps } from "react"
import type { WebIconComponentType } from "../types"

const LoginIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 64 64"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>{"Login"}</title>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M29.0192 52H47.0135C50.3252 51.9959 53.0085 49.3117 53.0116 46V18V18.0001C53.0086 14.6884 50.3253 12.0042 47.0136 12H29.0192C25.7074 12.004 23.0239 14.6882 23.0208 18V24V24C23.013 25.1042 23.9018 26.0057 25.006 26.0135C26.1102 26.0213 27.0117 25.1325 27.0195 24.0283C27.0196 24.0188 27.0196 24.0094 27.0195 24V18V18C27.0205 16.8958 27.9154 16.001 29.0195 16H47.0135C48.1175 16.0012 49.0121 16.896 49.0129 18V46V46C49.0118 47.1038 48.1174 47.9985 47.0136 48H29.0193C27.9152 47.9987 27.0205 47.104 27.0193 46V40V40C27.0271 38.8958 26.1383 37.9943 25.034 37.9865C23.9298 37.9787 23.0284 38.8675 23.0206 39.9717C23.0205 39.9812 23.0205 39.9906 23.0206 40V46L23.0206 45.9999C23.0236 49.3118 25.7072 51.9961 29.0191 52L29.0192 52ZM11 32V31.9999C10.9996 33.1041 11.8944 33.9996 12.9986 34H32.9748V38.995C32.9845 39.5619 33.452 40.0136 34.0189 40.0038C34.2261 40.0003 34.4273 39.9341 34.5962 39.814L44.5638 32.8252C45.0162 32.5125 45.1294 31.8923 44.8167 31.44C44.7483 31.3411 44.6627 31.2554 44.5638 31.1871L34.5962 24.1983C34.134 23.8698 33.4931 23.9781 33.1645 24.4403C33.0445 24.6091 32.9784 24.8104 32.9748 25.0175V29.9999H12.9986C11.8945 30.0002 10.9997 30.8956 11 31.9997C11 31.9998 11 31.9998 11 31.9999L11 32Z"
			fill={props.fill}
		/>
	</svg>
)
const Login: WebIconComponentType = ({
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
	return React.createElement(LoginIcon, {
		...otherProps,
		style: combinedStyle,
		width: size,
		height: size,
		fill,
	})
}
export default Login
