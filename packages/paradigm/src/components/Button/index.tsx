import React from "react"
import { useTheme, type ViewStyle } from "tamagui"

import { usePointerEvents } from "../../hooks/usePointerEvents"
import { useShadow as getShadow } from "../../hooks/useShadow"
import { ComponentError } from "../ComponentError"
import { Icon, type IconComponentType } from "../Icon"
import { Text } from "../Text"
import { MotionView, type Row, ViewContext } from "../View"

import type { FontKey } from "../../config/fonts"
import type { OnPressWithRef } from "../../utils/types"
import type { WebIconComponentProps } from "../Icon/types"

type RowColorType = React.ComponentProps<typeof Row>["color"]
type TextColorType = React.ComponentProps<typeof Text>["color"]
type ParadigmButtonProps<
	IconType extends IconComponentType = IconComponentType,
> = {
	/**
	 * The Icon for this button
	 */
	icon?: IconType
	/**
	 * Props to pass to the icon component
	 */
	iconProps?: React.ComponentProps<IconType>
	/**
	 * the text to show on the button, if any
	 */
	label?: string | React.ReactNode
	/**
	 * what happens when the button is pressed?
	 *
	 * This is `OnPressWithRef` so its possible to find the button when needed (popups, etc.)
	 */
	onPress?: OnPressWithRef
	/**
	 * is this button important? Should only be 1 per page.
	 */
	isPrimary?: boolean
	/**
	 * Does this button have a negative effect (delete, etc.)
	 */
	isNegative?: boolean
	/**
	 * Is this button floating?
	 */
	isRaised?: boolean
	/**
	 * is this button disabled?
	 * This will make `onPress` not work even if defined
	 */
	isDisabled?: boolean
	/**
	 * Is this button currently in a loading state.
	 * This will disable `onPress` even if defined
	 */
	isLoading?: boolean
	/**
	 * Should this button have a disclosure arrow on the right?
	 */
	hasDisclosure?: boolean
	/**
	 * What size is this button?
	 * Defaults to `medium`
	 */
	size?: "small" | "medium"
	/**
	 * can this button grow to fill available space?
	 */
	canGrow?: boolean
} & Pick<ViewStyle, "m" | "mt" | "mr" | "mb" | "ml" | "mx" | "my">

const { all: e1 } = getShadow({
	shadowName: "elevation1",
	forceBoxShadow: true,
})
const { all: e2 } = getShadow({
	shadowName: "elevation2",
	forceBoxShadow: true,
})

export const Button = ({
	label,
	icon: IconComponent,
	iconProps,
	onPress,
	isPrimary,
	isNegative,
	isRaised,
	isDisabled: isMarkedDisabled = false,
	isLoading,
	hasDisclosure,
	size = "medium",
	canGrow,
	...otherProps
}: ParadigmButtonProps) => {
	const theme = useTheme()
	const { color: parentColor } = React.useContext(ViewContext)
	const { isHovered, isActive, pointerProps } = usePointerEvents()
	const buttonRef = React.useRef(null)

	if (!label && !IconComponent) {
		return <ComponentError text="Button needs label, the icon prop, or both." />
	}

	/**
	 * All the vars!
	 */
	let outerPadding: number
	let innerPadding: number
	let iconSize: number
	let buttonHeight: number
	let textStyle: FontKey
	let disclosureSize: number
	let backgroundColor: RowColorType
	let textColor: TextColorType
	let iconColor: string
	let disclosureColor: string

	const resolveColor = (value: unknown): string => {
		if (typeof value === "string") return value
		const maybe = value as { get?: () => unknown }
		if (maybe?.get) return String(maybe.get())
		return String(value)
	}

	/**
	 * Button Sizing!
	 */
	switch (size) {
		case "medium": {
			buttonHeight = 36
			outerPadding = 8
			innerPadding = 4
			iconSize = 20
			disclosureSize = 18
			textStyle = Text.style.header6

			break
		}
		case "small": {
			buttonHeight = 28
			outerPadding = 6
			innerPadding = 4
			iconSize = 18
			disclosureSize = 16
			textStyle = Text.style.footnote

			break
		}
	}

	// the button is disabled both when loading and when actively marked disabled
	const isDisabled = isMarkedDisabled || isLoading

	const buttonState = isDisabled
		? isLoading
			? "loading"
			: "disabled"
		: isHovered
			? isActive
				? "hoverActive"
				: "hover"
			: isActive
				? "active"
				: "normal"

	// Background Color
	const raisedColor = parentColor
		? parentColor.toString() !== "$background"
			? theme.background
			: theme.cardStock
		: theme.cardStock

	switch (buttonState) {
		case "loading":
		case "disabled": {
			backgroundColor = theme.cardStock
			break
		}
		case "hover": {
			backgroundColor = isPrimary
				? isNegative
					? theme.negativeHover
					: theme.primaryHover
				: isRaised
					? raisedColor
					: theme.normalHover
			break
		}
		case "active":
		case "hoverActive": {
			backgroundColor = isPrimary
				? isNegative
					? theme.negativeActive
					: theme.primaryActive
				: isRaised
					? raisedColor
					: theme.normalActive
			break
		}
		default: {
			// normal
			if (isPrimary) {
				if (isNegative) {
					backgroundColor = theme.destructive
				} else {
					backgroundColor = theme.primary
				}
			} else {
				if (isRaised) {
					backgroundColor = raisedColor
				} else {
					backgroundColor = theme.cardStock
				}
			}
		}
	}

	// Disclosure + Icon Color
	switch (buttonState) {
		case "loading":
		case "disabled": {
			iconColor = disclosureColor = resolveColor(theme.colorDisabled)
			break
		}
		default: {
			iconColor = disclosureColor = resolveColor(
				isPrimary
					? theme.colorOnPrimary
					: isNegative
						? theme.destructive
						: theme.primary,
			)
		}
	}

	// Text Color
	if (hasDisclosure) {
		textColor = isPrimary
			? theme.colorOnPrimary
			: isNegative
				? theme.destructive
				: theme.color
	} else {
		switch (buttonState) {
			case "loading":
			case "disabled": {
				textColor = theme.colorDisabled
				break
			}
			default: {
				textColor = isPrimary
					? theme.colorOnPrimary
					: isNegative
						? theme.destructive
						: theme.primary
			}
		}
	}

	const iconComponentProps: WebIconComponentProps = {
		size: iconSize,
		color: iconColor,
	}

	return (
		<MotionView
			ref={buttonRef}
			center
			noShrink
			grow={canGrow}
			color={backgroundColor}
			height={buttonHeight}
			radius={"$md"}
			px={outerPadding}
			_tamaguiProps={{ flexDirection: "row" }}
			{...otherProps}
			{...pointerProps}
			disabled={isDisabled}
			cursor={isDisabled ? "not-allowed" : "pointer"}
			variants={{
				normal: {},
				raised: { y: -1, ...e1 },
				hover: { y: -3, ...e2 },
				active: { y: 0, ...e1 },
			}}
			animate={
				isRaised && !isDisabled
					? isHovered
						? isActive
							? "active"
							: "hover"
						: "raised"
					: "normal"
			}
			transition={{ type: "spring", visualDuration: 0.35, bounce: 0.35 }}
			onPress={(event) => {
				onPress?.({ ref: buttonRef, event })
			}}
		>
			{IconComponent && (
				<IconComponent {...iconComponentProps} {...iconProps} />
			)}
			{label && (
				<Text
					noUserSelect
					noLineHeight
					style={textStyle}
					letterCase={Text.letterCase.title}
					color={textColor}
					mx={innerPadding}
				>
					{isLoading ? "Loading…" : label}
				</Text>
			)}
			{hasDisclosure && (
				<Icon.ChevronDown
					size={disclosureSize}
					color={disclosureColor}
					style={{ marginLeft: innerPadding }}
				/>
			)}
		</MotionView>
	)
}
