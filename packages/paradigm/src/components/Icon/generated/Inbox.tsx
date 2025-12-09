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
			d="M49.01 54.0208H15.01C12.2486 54.0208 10.01 51.7822 10.01 49.0208V41.3484V41.3477C10.01 40.4636 10.0686 39.5806 10.1854 38.7043L13.4317 14.36C13.7629 11.8759 15.8819 10.0207 18.388 10.0208H45.6328C48.1388 10.0208 50.2577 11.876 50.5889 14.36L53.8348 38.705V38.705C53.9519 39.5813 54.0106 40.4643 54.0105 41.3484V49.0209V49.0208C54.0105 51.7822 51.7719 54.0208 49.0105 54.0208C49.0104 54.0208 49.0102 54.0208 49.0101 54.0208L49.01 54.0208ZM49.8235 38.8886L46.6235 14.8886C46.5573 14.3919 46.1336 14.0209 45.6324 14.0208H18.3878C17.8867 14.0209 17.4631 14.3919 17.3968 14.8886L14.1968 38.8886C14.1238 39.436 14.5084 39.939 15.0558 40.012C15.0996 40.0179 15.1438 40.0208 15.188 40.0208H22.29C22.7205 40.0208 23.1026 40.2962 23.2387 40.7046L24.7829 45.337C24.919 45.7454 25.3012 46.0208 25.7316 46.0208H38.29C38.7205 46.0208 39.1026 45.7454 39.2387 45.337L40.7829 40.7046C40.919 40.2962 41.3012 40.0208 41.7316 40.0208H48.8332C49.3855 40.0206 49.833 39.5727 49.8328 39.0204C49.8328 38.9763 49.8298 38.9323 49.824 38.8886H49.8235Z"
			fill={props.fill}
			style={{
				fill: "#385994",
				fill: "color(display-p3 0.2196 0.3490 0.5804)",
				fillOpacity: 1,
			}}
		/>
	</svg>
)
const Inbox = (props: any) => {
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
export default Inbox
