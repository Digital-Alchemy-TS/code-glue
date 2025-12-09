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
			opacity={0.75}
			fillRule="evenodd"
			clipRule="evenodd"
			d="M49.3865 49.3994C47.5795 51.2072 45.3265 52.0202 41.4604 52.0208H22.5567C18.6905 52.0202 16.4378 51.2072 14.6307 49.3994C12.8236 47.5916 12.0107 45.3364 12.0107 41.466V22.5787C12.0107 18.7087 12.8235 16.4536 14.6307 14.6454C16.4379 12.8372 18.6921 12.0241 22.5607 12.0241C22.5607 12.0241 36.9058 12.0209 38.0107 12.0209C39.1153 12.0209 40.0107 12.9163 40.0107 14.0209C40.0107 19.5438 44.4879 24.0209 50.0107 24.0209C51.1153 24.0209 52.0107 24.9163 52.0107 26.0209C52.0107 27.1255 52.0071 41.4661 52.0071 41.4661C52.0068 45.3364 51.194 47.591 49.3865 49.3994Z"
			fill={props.fill}
			style={{
				fill: "#385994",
				fill: "color(display-p3 0.2196 0.3490 0.5804)",
				fillOpacity: 1,
			}}
		/>
		<path
			d="M42.0107 14.0211C42.0103 18.4394 45.5917 22.0214 50.01 22.0218C54.4283 22.0218 58.0107 18.4401 58.0107 14.0218C58.0107 9.60379 54.4294 6.02218 50.0114 6.02179C45.5931 6.0214 42.0111 9.60281 42.0107 14.0211Z"
			fill={props.fill}
			style={{
				fill: "#385994",
				fill: "color(display-p3 0.2196 0.3490 0.5804)",
				fillOpacity: 1,
			}}
		/>
	</svg>
)
const Notifications = (props: any) => {
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
export default Notifications
