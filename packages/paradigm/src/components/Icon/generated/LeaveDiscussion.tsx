import { useTheme } from "@tamagui/core"
import * as React from "react"

import { TextContext } from "../../Text"

import type { SVGProps } from "react"
import type { WebIconComponentType } from "../types"

const LeaveDiscussionIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 64 64"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>{"LeaveDiscussion"}</title>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M9.27369 11.9299L24.7985 8.05349C25.7536 7.81507 26.7211 8.39604 26.9595 9.35112C26.9945 9.49137 27.0124 9.63535 27.0126 9.77989V11.9979H36.0178C37.6746 11.997 39.0186 13.3393 39.0195 14.9962C39.0195 14.9962 39.0195 14.9963 39.0195 14.9963V23.9939V23.9939C39.0117 25.0992 38.1094 25.9888 37.0041 25.981C35.9099 25.9733 35.0247 25.0881 35.017 23.9939V15.9962H27.0126V47.977H35.0178V39.9943V39.9943C35.0256 38.889 35.9279 37.9994 37.0332 38.0072C38.1274 38.0149 39.0126 38.9001 39.0203 39.9943V48.9764V48.9763C39.0195 50.6331 37.6757 51.9756 36.0188 51.9748C36.0185 51.9748 36.0182 51.9748 36.0179 51.9748H27.0126V54.1928C27.0116 55.177 26.2129 55.9741 25.2287 55.973C25.0836 55.9729 24.9392 55.955 24.7985 55.9199L9.2737 52.0429C7.93805 51.7099 7.00053 50.5105 7 49.134V14.8391V14.8399C7 13.4633 7.93721 12.2634 9.27287 11.9301L9.27369 11.9299ZM33.0078 31.9944C33.0078 30.8898 33.9032 29.9944 35.0078 29.9944H45.0207V25.012V25.012C45.0308 24.4447 45.4989 23.9929 46.0662 24.003C46.2732 24.0067 46.4743 24.0728 46.6431 24.1928L56.5859 31.1816C57.0382 31.4942 57.1515 32.1143 56.8389 32.5667C56.7705 32.6656 56.6848 32.7513 56.5859 32.8197L46.6431 39.8085C46.1807 40.1373 45.5393 40.0289 45.2106 39.5665C45.0906 39.3977 45.0244 39.1966 45.0207 38.9895V33.9944H35.0071C33.9028 33.994 33.0078 33.0987 33.0078 31.9944L33.0078 31.9944Z"
			fill={props.fill}
		/>
	</svg>
)
const LeaveDiscussion: WebIconComponentType = ({
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
	return React.createElement(LeaveDiscussionIcon, {
		...otherProps,
		style: combinedStyle,
		width: size,
		height: size,
		fill,
	})
}
export default LeaveDiscussion
