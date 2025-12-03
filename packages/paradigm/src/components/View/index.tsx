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

export type ViewProps = Omit<TamaguiViewProps, never> & ParadigmViewProps
export type ColProps = Omit<YStackProps, never> & ParadigmViewProps
export type RowProps = Omit<XStackProps, never> & ParadigmViewProps
export type StackProps = Omit<ZStackProps, never> & ParadigmViewProps

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
