import {
	type TamaguiElement,
	View as TamaguiView,
	type ViewProps as TamaguiViewProps,
	XStack,
	type XStackProps,
	YStack,
	type YStackProps,
	ZStack,
	type ZStackProps,
} from "tamagui"

type ParadigmViewProps = {
	ref?: React.Ref<TamaguiElement>
}

export type ViewProps = TamaguiViewProps & ParadigmViewProps
export type ColProps = YStackProps & ParadigmViewProps
export type RowProps = XStackProps & ParadigmViewProps
export type StackProps = ZStackProps & ParadigmViewProps

const View = (props: ViewProps) => {
	const { children, ref, ...otherProps } = props
	return (
		<TamaguiView ref={ref} {...otherProps}>
			{children}
		</TamaguiView>
	)
}

const Column = (props: ColProps) => <YStack {...props} />
const Row = (props: RowProps) => <XStack {...props} />
const Stack = (props: StackProps) => <ZStack {...props} />

export { View, Column, Row, Stack }
