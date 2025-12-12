import { motion } from "motion/react"
import {
	type TamaguiElement,
	View as TamaguiView,
	type ViewProps as TamaguiViewProps,
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
	/**
	 * the background color of this view. Should come from useTheme() ideally with .get()
	 * https://tamagui.dev/docs/core/use-theme
	 */
	color?: TamaguiViewProps["backgroundColor"]
	/**
	 * The color of the parent background. Used for things like coloring shadows.
	 * TODO: should we put this into context?
	 */
	parentColor?: TamaguiViewProps["backgroundColor"]
	children?: React.ReactNode
	/**
	 * flex grow, used alone defaults to 1
	 */
	grow?: number | boolean
	/**
	 * disables flex shrink
	 */
	noShrink?: boolean
	/**
	 * if true, sets overflow to hidden
	 */
	overflow?: boolean
	/**
	 * if true, makes the view take the full screen size
	 */
	fullscreen?: boolean
	/**
	 * Center the content within this view horizontally, vertically, or both
	 */
	center?: boolean | "h" | "v"
	/**
	 * Shorthand for justifyContent
	 */
	justify?: TamaguiViewProps["justifyContent"]
	/**
	 * Shorthand for alignItems
	 */
	align?: TamaguiViewProps["alignItems"]
	/**
	 * Internal override for tamagui props
	 */
	_tamaguiProps?: TamaguiViewProps
}

const View = (props: ParadigmViewProps) => {
	const {
		children,
		shadow,
		color,
		parentColor,
		grow,
		noShrink,
		overflow,
		fullscreen,
		center,
		justify,
		align,
		_tamaguiProps,
		...otherProps
	} = props

	const shadowStyle = useShadow({
		shadowName: shadow,
		color: parentColor as string,
		forceBoxShadow: props.forceBoxShadow,
	})

	/**
	 * Justify, Align, Centering logic
	 */
	const centerBoth = typeof center === "boolean" && center
	const flexDirection = _tamaguiProps?.flexDirection || "column"

	return (
		<TamaguiView
			flexGrow={grow && typeof grow !== "number" ? 1 : grow ? grow : 0}
			flexShrink={noShrink ? 0 : 1}
			overflow={overflow ? "hidden" : undefined}
			backgroundColor={color}
			flexDirection="column"
			justifyContent={
				centerBoth ||
				(center && center === "h" && flexDirection === "row") ||
				(center && center === "v" && flexDirection === "column")
					? "center"
					: justify
			}
			alignItems={
				centerBoth ||
				(center && center === "v" && flexDirection === "row") ||
				(center && center === "h" && flexDirection === "column")
					? "center"
					: align
			}
			{...(fullscreen
				? { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }
				: {})}
			{...otherProps}
			{...shadowStyle}
			{..._tamaguiProps}
		>
			{children}
		</TamaguiView>
	)
}

const MotionView = motion.create(View)

const Column = (props: ParadigmViewProps) => (
	<View _tamaguiProps={{ flexDirection: "column" }} {...props} />
)
const Row = (props: ParadigmViewProps) => (
	<View _tamaguiProps={{ flexDirection: "row" }} {...props} />
)

export { View, MotionView, Column, Row }
