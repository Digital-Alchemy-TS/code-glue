import * as React from "react"
import type { SVGProps } from "react"
import { TextContext } from "../../../Text/TextContext"
import { useDesign } from "../../../DesignSystem"
const undefinedIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 64 64"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M32 56C18.7452 56 8 45.2548 8 32C8 18.7452 18.7452 8 32 8C45.2548 8 56 18.7452 56 32V32C56 45.2548 45.2548 56 32 56ZM24 22C22.2122 22 21 23.8751 21 26.4889C21 29.15 22.4 30 24 30C25.6 30 27 29.15 27 26.4889C27 23.8751 25.7883 22 24 22ZM40 22C38.2122 22 37 23.8751 37 26.4889C37 29.15 38.4 30 40 30C41.6 30 43 29.15 43 26.4889C43 23.8751 41.7883 22 40 22ZM45.25 36C43.8628 36 40.5625 38 32 38C23.4375 38 20.1372 36 18.75 36C18.3645 35.9713 18.0287 36.2606 18 36.6461C17.9974 36.6807 17.9974 36.7154 18 36.75C18 42 24 48 32 48C40 48 46 42 46 36.75C46.0287 36.3645 45.7394 36.0287 45.3539 36C45.3193 35.9974 45.2846 35.9974 45.25 36Z"
			fill={props.fill}
			style={{
				fill: "#385994",
				fill: "color(display-p3 0.2196 0.3490 0.5804)",
				fillOpacity: 1,
			}}
		/>
	</svg>
)
const EmojiPeople = (props: any) => {
	const { size, color = "black", style = {}, ...otherProps } = props
	let fill = color
	const { variables } = useDesign()
	const { isInText } = React.useContext(TextContext)
	if (isInText) {
		style.verticalAlign = "bottom"
		fill = variables.iconInTextColor
	}
	return React.createElement(undefinedIcon, {
		...otherProps,
		style,
		width: size,
		height: size,
		fill,
	})
}
export default EmojiPeople
