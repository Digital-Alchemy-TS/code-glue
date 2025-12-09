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
			d="M29.14 50.8441H29.14C25.5024 48.9444 21.4537 47.9675 17.35 47.9993C15.0246 48.0211 12.7113 48.3375 10.4655 48.941C9.87644 49.1314 9.24461 48.8081 9.05429 48.219C9.01787 48.1063 8.99954 47.9885 9.00001 47.87V15.2542V15.2542C8.99985 14.7842 9.29187 14.3637 9.73229 14.1996H9.73229C12.201 13.4374 14.7665 13.034 17.35 13.0017H17.35C21.971 12.9465 26.5127 14.2038 30.4475 16.6274C30.7949 16.8591 31.0025 17.2499 31 17.6674V49.7743V49.7743C30.9951 50.4607 30.4347 51.0131 29.7483 51.0082C29.5348 51.0067 29.3253 50.9502 29.14 50.8441H29.14ZM55 15.2541V47.87V47.8701C55.0024 48.4891 54.5025 48.9929 53.8835 48.9953C53.765 48.9958 53.6472 48.9775 53.5345 48.941C51.2887 48.3375 48.9754 48.0211 46.65 47.9993C42.5463 47.9675 38.4976 48.9444 34.86 50.8441C34.2643 51.185 33.505 50.9784 33.1641 50.3827C33.058 50.1973 33.0015 49.9877 33 49.7741V17.6674V17.6674C32.9975 17.2499 33.2051 16.8591 33.5525 16.6274H33.5525C37.4873 14.2038 42.029 12.9465 46.65 13.0017H46.65C49.2336 13.034 51.7992 13.4374 54.268 14.1996C54.7083 14.3638 55.0002 14.7843 55 15.2542V15.2541Z"
			fill={props.fill}
			style={{
				fill: "#385994",
				fill: "color(display-p3 0.2196 0.3490 0.5804)",
				fillOpacity: 1,
			}}
		/>
	</svg>
)
const Directory = (props: any) => {
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
export default Directory
