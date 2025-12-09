import { SizableText as TamaguiText } from "tamagui"

import { FontKey } from "@/config/fonts"
import { type LetterCaseType, letterCase } from "./letterCase"

import type {
	TextProps as NativeTextProps,
	StyleProp,
	TextStyle,
} from "react-native"
import type { SpacePaddingProps } from "@/config/shorthands"

enum fitValues {
	ellipsis = "ellipsis",
	shrink = "shrink",
	wrap = "wrap",
}

type TextProps = {
	/**
	 * the text style to use.
	 */
	style?: FontKey
	/**
	 * How should text fit within its container?
	 *
	 * *Note* Shrink does not work on web at the moment.
	 * *Note* Will not work on child text nodes.
	 */
	fit?: fitValues
	/**
	 * Should the case of the text be manipulated?
	 */
	letterCase?: LetterCaseType
	/**
	 * Alignment of text
	 */
	align?: "auto" | "left" | "right" | "center" | "justify"
	/**
	 * a color override
	 */
	color?: string
	/**
	 * Set this to `true` to remove the line height set via `style`. Useful for when you want text vertically centered.
	 */
	noLineHeight?: boolean
	/**
	 * use tabular numbers
	 */
	tabularNumbers?: boolean
	/**
	 * disable user selection
	 */
	noUserSelect?: boolean
	/**
	 * Don't adjust text scale based on accessibility settings
	 */
	noScale?: boolean
	/**
	 * Internal override for text styles
	 */
	_style?: StyleProp<TextStyle>
	/**
	 * onLayout from native
	 */
	onLayout?: NativeTextProps["onLayout"]
	/**
	 * Children
	 */
	children?: React.ReactNode
} & SpacePaddingProps

const Text: React.FC<TextProps> & {
	style: typeof FontKey
	fitValues: typeof fitValues
	letterCase: typeof letterCase
} = ({
	style,
	fit,
	letterCase,
	align,
	color,
	noLineHeight,
	tabularNumbers,
	noUserSelect,
	noScale,
	_style,

	children,

	...otherProps
}) => {
	return (
		<TamaguiText size={style} {...otherProps}>
			{children}
		</TamaguiText>
	)
}

Text.style = FontKey
Text.fitValues = fitValues
Text.letterCase = letterCase

export { Text }
