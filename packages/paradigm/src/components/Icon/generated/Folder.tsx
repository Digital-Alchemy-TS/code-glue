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
			d="M56.0115 28.1742L54.388 49.2509C54.2666 50.8149 52.9616 52.0218 51.3929 52.0209H12.6486C11.0799 52.0218 9.77498 50.8149 9.65351 49.2509L8.03001 28.1742H8.03001C7.9459 27.0722 8.77108 26.1106 9.87311 26.0265C9.92425 26.0226 9.97552 26.0207 10.0268 26.0207H54.0146C55.1199 26.02 56.0166 26.9155 56.0173 28.0208C56.0173 28.072 56.0154 28.1232 56.0115 28.1742L56.0115 28.1742ZM54.0207 20.0208V23.0208C54.0207 23.5731 53.573 24.0208 53.0207 24.0208H11.0207H11.0207C10.4684 24.0208 10.0207 23.5731 10.0207 23.0208V14.0208V14.0208C10.0207 12.9162 10.9161 12.0208 12.0207 12.0208H23.3637H23.3637C24.4246 12.0208 25.4421 12.4423 26.1923 13.1925L29.849 16.8494C30.5993 17.5995 31.6167 18.0209 32.6776 18.0209H52.0206C53.1252 18.0209 54.0206 18.9162 54.0207 20.0208V20.0208V20.0208Z"
			fill={props.fill}
			style={{
				fill: "#385994",
				fill: "color(display-p3 0.2196 0.3490 0.5804)",
				fillOpacity: 1,
			}}
		/>
	</svg>
)
const Folder = (props: any) => {
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
export default Folder
