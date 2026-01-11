import React from "react"
import { type LayoutChangeEvent, StyleSheet } from "react-native"

import { Platform } from "../utils/platform"

/**
 * Provides web with the same behavior as native's `alwaysBounceVertical`
 * just pass the return values of this hook to a `ScrollView` or `ScrollView` like component.
 *
 * https://github.com/necolas/react-native-web/issues/1605
 */
export const useAlwaysBounceVertical = () => {
	const [height, setHeight] = React.useState<number | undefined>(undefined)

	const onLayout = React.useCallback((event: LayoutChangeEvent) => {
		const {
			nativeEvent: {
				layout: { height },
			},
		} = event

		setHeight(height)
	}, [])

	if (Platform.isNative)
		throw new Error("useAlwaysBounceVertical should only be used on web.")

	// Only add the behavior for Safari as other browsers have no bounce 😭
	if (!Platform.isSafari) {
		return {
			contentContainerStyle: {},
			onLayout: () => null,
		}
	}

	return {
		contentContainerStyle: {
			minHeight: height ? height + StyleSheet.hairlineWidth : undefined,
		},
		onLayout,
	}
}
