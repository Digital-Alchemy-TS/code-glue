import React from "react"
import { Pressable, type PressableProps } from "react-native"

import { useActive, useHover } from "../../hooks"

type TouchableProps = PressableProps & {
	onActiveStateChange?: (activeState: boolean) => void
	onHoverStateChange?: (hoverState: boolean) => void

	/**
	 * ability to disable this touchable
	 */
	isDisabled?: boolean
	/**
	 * something to do if the user presses while disabled
	 */
	onDisabledPress?: () => void
}

export const Touchable = ({
	onActiveStateChange,
	onHoverStateChange,
	onPress,
	isDisabled = false,
	onDisabledPress,
	...props
}: TouchableProps & {
	onMouseEnter?: () => void

	children?: PressableProps["children"]
}) => {
	const touchableIsEnabled = !isDisabled && !!onPress

	const [isHovered, setIsHovered] = React.useState(false)
	const [isActive, setIsActive] = React.useState(false)

	const { hoverProps } = useHover({
		onBlur: () => setIsHovered(false),
		onHover: () => setIsHovered(touchableIsEnabled),
	})
	const { activeProps } = useActive({
		onNotActive: () => setIsActive(false),
		onActive: () => setIsActive(touchableIsEnabled),
	})

	React.useEffect(() => {
		if (touchableIsEnabled && onHoverStateChange) onHoverStateChange(isHovered)
	}, [touchableIsEnabled, isHovered, onHoverStateChange])

	React.useEffect(() => {
		if (touchableIsEnabled && onActiveStateChange) onActiveStateChange(isActive)
	}, [touchableIsEnabled, isActive, onActiveStateChange])

	return (
		<Pressable
			disabled={isDisabled && !onDisabledPress}
			onPress={isDisabled && onDisabledPress ? onDisabledPress : onPress}
			{...props}
			{...hoverProps}
			{...activeProps}
		/>
	)
}
