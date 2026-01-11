import React from "react"

import type { StyleProp, TextStyle } from "react-native"
import type { TextProps as TamaguiTextProps } from "tamagui"
import type { LetterCaseType } from "./letterCase"
export type TextContextType = {
	/**
	 * will be set to true if this component is inside a Text component.
	 */
	isInText: boolean
	/**
	 * by default this is undefined. the first `Text` sets this to True (if it is undefined).
	 * All nodes under that should then set it to false.
	 */
	isParent: boolean | undefined
	/**
	 * The letter case to apply to the text. Because this is calculated in JS, it isn't inherited by child <Text> components automatically..
	 */
	letterCase?: LetterCaseType
	/**
	 * Is this text is selectable.
	 */
	selectable?: boolean
	/**
	 * Any styles set on the parent via the override _style
	 */
	styles?: StyleProp<TextStyle>
	/**
	 * Pass color down till https://github.com/tamagui/tamagui/issues/3789 is fixed
	 */
	color?: TamaguiTextProps["color"]
}

export const TextContext = React.createContext<TextContextType>({
	isInText: false,
	isParent: undefined,
	letterCase: undefined,
	selectable: true,
	styles: undefined,
	color: undefined,
})
