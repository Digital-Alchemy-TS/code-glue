import type { ViewProps } from "react-native"

export type BaseIconComponentProps = {
	size: number
	color?: string
	style?: Omit<ViewProps["style"], "backgroundColor" | "width" | "height">
}

type IconComponentType = React.FunctionComponent<BaseIconComponentProps> // & SvgProps
