import { View as TamaguiView, type ViewProps } from "tamagui"

export const View = (props: ViewProps) => {
	return <TamaguiView {...props} px="$edgeInset" />
}
