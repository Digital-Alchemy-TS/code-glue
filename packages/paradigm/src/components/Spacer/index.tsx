import { View, type ViewProps } from "../View"

export type SpacerProps = {
	width?: ViewProps["width"]
	height?: ViewProps["height"]
	size?: ViewProps["width"]
}

export const Spacer = ({ width, height, size }: SpacerProps) => {
	return (
		<View
			width={width || size === undefined ? "$space.space" : size}
			height={height || size === undefined ? "$space.space" : size}
			noShrink
		/>
	)
}
