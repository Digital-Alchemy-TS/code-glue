import { motion } from "motion/react"
import {
	type TamaguiElement,
	View as TamaguiView,
	type ViewProps as TamaguiViewProps,
	type ViewStyle,
} from "tamagui"

import { useShadow } from "../../hooks/useShadow"

import type React from "react"
import type { ViewProps as RNViewProps } from "react-native"
import type { ShadowName } from "../../generated/shadows"

export type ViewProps = {
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
	 * The width
	 */
	width?: TamaguiViewProps["width"]
	/**
	 * The height
	 */
	height?: TamaguiViewProps["height"]
	/**
	 * flex grow, used alone defaults to 1
	 */
	grow?: number | boolean
	/**
	 * disables flex shrink
	 */
	noShrink?: boolean
	/**
	 * can this view wrap its contents?
	 */
	canWrap?: boolean
	/**
	 * if true, makes the view fill the container (position absolute, top/left/right/bottom 0)
	 */
	fillContainer?: boolean
	/**
	 * space in pixels between children
	 */
	between?: TamaguiViewProps["gap"]
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
	 * border radius
	 */
	radius?: TamaguiViewProps["borderRadius"]
	onLayout?: RNViewProps["onLayout"]
	/**
	 * What to do when this view is pressed
	 */
	onPress?: TamaguiViewProps["onPress"]
	/**
	 * Is this element disabled?
	 */
	disabled?: boolean
	/**
	 * Internal override for tamagui props
	 */
	_tamaguiProps?: TamaguiViewProps
} & Omit<
	ViewStyle,
	| "flexGrow"
	| "flexShrink"
	| "borderRadius"
	| "flexDirection"
	| "backgroundColor"
>

const View = (props: ViewProps) => {
	const {
		children,
		shadow,
		color: backgroundColor,
		parentColor,
		width,
		height,
		grow,
		noShrink,
		canWrap,
		overflow,
		fillContainer: fullscreen,
		center,
		justify,
		align,
		radius: borderRadius,
		m,
		mt,
		mr,
		mb,
		ml,
		mx,
		my,
		p,
		pt,
		pr,
		pb,
		pl,
		px,
		py,
		between,
		forceBoxShadow,
		_tamaguiProps,
		...otherProps
	} = props

	const { inner: innerShadows, outer: outerShadows } = useShadow({
		shadowName: shadow,
		color: parentColor as string,
		forceBoxShadow: forceBoxShadow,
	})

	/**
	 * Justify, Align, Centering logic
	 */
	const centerBoth = typeof center === "boolean" && center
	const flexDirection = _tamaguiProps?.flexDirection || "column"

	/**
	 * Style breakdown
	 * - Outer View: handles layout, sizing, background, shadows
	 * - Inner View: contains children, overflow hidden by default
	 */

	// these styles are on both the inner and outer views
	const sharedStyles: TamaguiViewProps = {
		borderRadius,
	}

	const innerStyles = {
		p,
		pt,
		pr,
		pb,
		pl,
		px,
		py,
		gap: between,
		justifyContent:
			centerBoth ||
			(center && center === "h" && flexDirection === "row") ||
			(center && center === "v" && flexDirection === "column")
				? "center"
				: justify,
		alignItems:
			centerBoth ||
			(center && center === "v" && flexDirection === "row") ||
			(center && center === "h" && flexDirection === "column")
				? "center"
				: align,
		overflow,
		backgroundColor,
		flexDirection,
		flexGrow: 1,
		flexWrap: canWrap ? ("wrap" as const) : ("nowrap" as const),
	}

	const outerStyles = {
		m,
		mt,
		mr,
		mb,
		ml,
		mx,
		my,
		width,
		height,
		flexGrow: typeof grow === "number" ? grow : grow ? 1 : 0,
		flexShrink: noShrink ? 0 : 1,
		overflow: "visible",
		...(fullscreen
			? ({
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
				} as const)
			: {}),
	}

	if (shadow) {
		return (
			<TamaguiView
				{...sharedStyles}
				{...outerStyles}
				{...outerShadows}
				{...otherProps}
				{..._tamaguiProps}
			>
				<TamaguiView
					{...sharedStyles}
					{...innerStyles}
					{...innerShadows}
					overflow={overflow ?? "hidden"}
				>
					{children}
				</TamaguiView>
			</TamaguiView>
		)
	} else {
		return (
			<TamaguiView
				{...sharedStyles}
				{...innerStyles}
				{...outerStyles}
				{...otherProps}
				{..._tamaguiProps}
			>
				{children}
			</TamaguiView>
		)
	}
}

const MotionView = motion.create(View)

const Column = (props: ViewProps) => (
	<View _tamaguiProps={{ flexDirection: "column" }} {...props} />
)
const Row = (props: ViewProps) => (
	<View _tamaguiProps={{ flexDirection: "row" }} {...props} />
)

const Center = (props: ViewProps) => <View grow center {...props} />

export { View, MotionView, Column, Row, Center }
