import { useTheme } from "@tamagui/core"
import * as React from "react"

import { TextContext } from "../../Text"

import type { SVGProps } from "react"
import type { WebIconComponentType } from "../types"

const JoinDiscussionIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 64 64"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>{"JoinDiscussion"}</title>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M49.7383 52.0423L34.2232 55.919C33.2687 56.1572 32.3018 55.5765 32.0636 54.622C32.0285 54.4814 32.0107 54.3371 32.0106 54.1922V51.9739H23.0106H23.0106C21.3542 51.9742 20.011 50.6318 20.0106 48.9753V41.9783C20.0106 40.8737 20.906 39.9783 22.0106 39.9783C23.1152 39.9783 24.0106 40.8737 24.0106 41.9783V47.9764H32.0106V15.9956H24.0106V21.9783C24.0106 23.0828 23.1152 23.9783 22.0106 23.9783C20.906 23.9783 20.0106 23.0828 20.0106 21.9783V14.9962V14.996C20.0112 13.3396 21.3543 11.9972 23.0107 11.9977H32.0107V9.77976V9.77972C32.0115 8.79605 32.8095 7.99924 33.7932 8C33.9382 8.00011 34.0827 8.01793 34.2234 8.05307L49.7383 11.9298C51.0735 12.263 52.0105 13.4624 52.0108 14.8387V49.1339V49.1338C52.0103 50.5098 51.0734 51.7089 49.7383 52.0422L49.7383 52.0423ZM23.5656 32.8039L13.6289 39.7927C13.1668 40.1212 12.5259 40.013 12.1973 39.551C12.0772 39.3821 12.0111 39.1808 12.0075 38.9737V33.9784H2C0.89543 33.9784 0 33.0829 0 31.9784C4.82823e-08 30.8738 0.895431 29.9784 2 29.9784H12.0075V24.996V24.996C12.0172 24.429 12.4847 23.9773 13.0517 23.987C13.2588 23.9906 13.46 24.0567 13.6289 24.1768L23.5656 31.1656C24.018 31.4785 24.1311 32.0989 23.8182 32.5513C23.7499 32.65 23.6643 32.7356 23.5656 32.8039V32.8039Z"
			fill={props.fill}
		/>
	</svg>
)
const JoinDiscussion: WebIconComponentType = ({
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
	return React.createElement(JoinDiscussionIcon, {
		...otherProps,
		style: combinedStyle,
		width: size,
		height: size,
		fill,
	})
}
export default JoinDiscussion
