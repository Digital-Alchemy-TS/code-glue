import * as React from "react"
import type { SVGProps } from "react"
import { TextContext } from "../../../Text/TextContext"
import { useDesign } from "../../../DesignSystem"
const undefinedIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 101 101"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<g filter="url(#filter0_d_28_72)">
			<rect
				x={4}
				y={2}
				width={93}
				height={93}
				rx={4}
				fill="white"
				style={{
					fill: "white",
					fillOpacity: 1,
				}}
			/>
		</g>
		<defs>
			<filter
				id="filter0_d_28_72"
				x={0}
				y={0}
				width={101}
				height={101}
				filterUnits="userSpaceOnUse"
				colorInterpolationFilters="sRGB"
			>
				<feFlood floodOpacity={0} result="BackgroundImageFix" />
				<feColorMatrix
					in="SourceAlpha"
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					result="hardAlpha"
				/>
				<feOffset dy={2} />
				<feGaussianBlur stdDeviation={2} />
				<feColorMatrix
					type="matrix"
					values="0 0 0 0 0.0705882 0 0 0 0 0.0705882 0 0 0 0 0.0705882 0 0 0 0.06 0"
				/>
				<feBlend
					mode="normal"
					in2="BackgroundImageFix"
					result="effect1_dropShadow_28_72"
				/>
				<feBlend
					mode="normal"
					in="SourceGraphic"
					in2="effect1_dropShadow_28_72"
					result="shape"
				/>
			</filter>
		</defs>
	</svg>
)
const ShadowTester = (props: any) => {
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
export default ShadowTester
