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
			d="M47.9897 11.0205C49.0942 11.0205 49.9897 11.916 49.9897 13.0205V21.5458V21.5458C49.9893 21.96 49.6533 22.2955 49.239 22.2952C49.0405 22.295 48.8502 22.2161 48.7097 22.0759L42.5756 15.9396C42.2007 15.5646 41.9901 15.056 41.9901 14.5256V13.0205C41.9901 11.916 42.8855 11.0205 43.9901 11.0205L47.9897 11.0205ZM47.9897 55.0205H38.9897C37.8851 55.0205 36.9897 54.1251 36.9897 53.0205V41.0205C36.9897 39.916 36.0942 39.0205 34.9897 39.0205H28.9897C27.8851 39.0205 26.9897 39.916 26.9897 41.0205V53.0205C26.9897 54.1251 26.0942 55.0205 24.9897 55.0205H15.9897C14.8851 55.0205 13.9897 54.1251 13.9897 53.0205V35.0074H9.99968C8.89472 35.0069 7.99944 34.1107 8 33.0057C8.00027 32.4756 8.21092 31.9673 8.58568 31.5923L30.5797 9.58584C31.3602 8.80499 32.6258 8.80468 33.4067 9.58515C33.4069 9.58538 33.4072 9.58561 33.4074 9.58584L55.4014 31.5923C56.1826 32.3737 56.1825 33.6404 55.4011 34.4216C55.0262 34.7965 54.5178 35.0072 53.9877 35.0074H49.9897V53.0204C49.9897 54.125 49.0942 55.0204 47.9897 55.0204L47.9897 55.0205Z"
			fill={props.fill}
			style={{
				fill: "#385994",
				fill: "color(display-p3 0.2196 0.3490 0.5804)",
				fillOpacity: 1,
			}}
		/>
	</svg>
)
const Home = (props: any) => {
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
export default Home
