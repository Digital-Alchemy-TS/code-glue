import React from "react"
import {
	SizableText as TamaguiText,
	type TextProps as TamaguiTextProps,
} from "tamagui"

import { FontKey } from "../../config/fonts"
import { pluralize } from "../../utils/pluralize"
import { TextContext, type TextContextType } from "./context"
import {
	type LetterCaseType,
	letterCase as letterCaseValues,
} from "./letterCase"

import type {
	TextProps as NativeTextProps,
	StyleProp,
	TextStyle,
} from "react-native"
import type { SpaceProps } from "../../config/shorthands"

enum fitValues {
	ellipsis = "ellipsis",
	shrink = "shrink",
	wrap = "wrap",
}

const defaults = {
	fit: fitValues.ellipsis,
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
	color?: TamaguiTextProps["color"]
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
	children?: string | React.ReactNode
} & SpaceProps

const Text: React.FC<TextProps> & {
	style: typeof FontKey
	fitValues: typeof fitValues
	letterCase: typeof letterCaseValues
	pluralize: typeof pluralize
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
	// Context from parent
	const context = React.useContext(TextContext)

	// if this node is a parent all its children are not.
	const isParent = context.isParent === undefined

	/**
	 * Transform context before passing to children
	 */

	// if a child has its own letterCase use that instead of the parent value
	const letterCaseFunction = letterCase || context.letterCase

	// by default children get the same lettercase as their parent (this component)
	let childLetterCase = letterCaseFunction

	// if we're doing sentence case and this component is text, we've satisfied the case and can remove `letterCase` from children.
	if (letterCaseFunction === letterCaseValues.sentence) {
		React.Children.forEach(children, (child, i) => {
			if (typeof child === "string" && i === 0) {
				childLetterCase = undefined
				return
			}
		})
	}

	// the selectable value from the parent
	const selectable = context.selectable

	// Context to pass to children
	const textState = React.useMemo<TextContextType>(
		() => ({
			isInText: true,
			isParent,
			letterCase: childLetterCase,
			selectable: noUserSelect === undefined ? selectable : !noUserSelect,
			styles: { ...context.styles, ..._style },
		}),
		[
			isParent,
			childLetterCase,
			noUserSelect,
			selectable,
			_style,
			context.styles,
		],
	)

	// Fit

	if (!textState.isParent && (fit || align)) {
		throw new Error(
			"fit or align can only be set on parent level `Text` elements.",
		)
	}

	// default values
	const fitValue = !fit && textState.isParent ? defaults.fit : fit

	/**
	 * letterCase
	 */

	let casedChildren = children

	if (letterCaseFunction) {
		casedChildren = React.Children.map(children, (child, i) => {
			if (
				typeof child === "string" &&
				((letterCaseFunction === Text.letterCase.sentence && i === 0) ||
					letterCaseFunction !== Text.letterCase.sentence)
			) {
				return letterCaseFunction(child)
			}

			return child
		})
	}

	return (
		<TextContext value={textState}>
			<TamaguiText
				size={style}
				userSelect={noUserSelect ? "none" : undefined}
				color={color}
				style={{
					...textState.styles,
					...(noLineHeight ? { lineHeight: undefined } : {}),
					fontVariant: tabularNumbers
						? ["tabular-nums"]
						: ["proportional-nums"],
					textAlign: align,
				}}
				numberOfLines={
					fitValue && [fitValues.ellipsis, fitValues.shrink].includes(fitValue)
						? 1
						: undefined
				}
				adjustsFontSizeToFit={fitValue === fitValues.shrink}
				{...otherProps}
			>
				{casedChildren}
			</TamaguiText>
		</TextContext>
	)
}

Text.style = FontKey
Text.fitValues = fitValues
Text.letterCase = letterCaseValues
Text.pluralize = pluralize

export { Text, TextContext }
