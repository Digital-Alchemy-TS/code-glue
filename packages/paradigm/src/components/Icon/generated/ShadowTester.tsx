import { useTheme } from "@tamagui/core"
import * as React from "react"

import { TextContext } from "../../Text"

import type { SVGProps } from "react"
import type { WebIconComponentType } from "../types"

const ShadowTesterIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 101 101"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>{"ShadowTester"}</title>
		<g filter="url(#filter0_d_28_72)">
			<rect x={4} y={2} width={93} height={93} rx={4} fill="white" />
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
const ShadowTester: WebIconComponentType = ({
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
	return React.createElement(ShadowTesterIcon, {
		...otherProps,
		style: combinedStyle,
		width: size,
		height: size,
		fill,
	})
}
export default ShadowTester
