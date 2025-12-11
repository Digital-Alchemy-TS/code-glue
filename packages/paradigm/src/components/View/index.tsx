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

import { useShadow } from "../../hooks/useShadow"

import type { ShadowName } from "../../generated/shadows"

type ParadigmViewProps = {
	ref?: React.Ref<TamaguiElement>
	/**
	 * the shadow name (from Figma) to apply to the component
	 */
	shadow?: ShadowName
	/**
	 * should the shadow be forced to use box-shadow instead of filter drop-shadow?
	 */
	forceBoxShadow?: boolean
}

export type ViewProps = Omit<TamaguiViewProps, never> & ParadigmViewProps
export type ColProps = Omit<YStackProps, never> & ParadigmViewProps
export type RowProps = Omit<XStackProps, never> & ParadigmViewProps
export type StackProps = Omit<ZStackProps, never> & ParadigmViewProps

const View = (props: ViewProps) => {
	const { children, ref, shadow, style, ...otherProps } = props

	const shadowStyle = useShadow({
		shadowName: shadow,
		color: otherProps.backgroundColor as string,
		forceBoxShadow: props.forceBoxShadow,
	})

	const finalStyle = [style, { ...shadowStyle }]

	return (
		<TamaguiView ref={ref} style={finalStyle} {...otherProps}>
			{children}
		</TamaguiView>
	)
}

const Column = (props: ColProps) => <YStack {...props} />
const Row = (props: RowProps) => <XStack {...props} />
const Stack = (props: StackProps) => <ZStack {...props} />

export { View, Column, Row, Stack }
