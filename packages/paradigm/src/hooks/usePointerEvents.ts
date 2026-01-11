import React from "react"

export type ActivePropsType = {
	onActive?: () => void
	onNotActive?: () => void
}

export type HoverPropsType = {
	onHover?: () => void
	onBlur?: () => void
}

/**
 * creates simple common pointer events like hover and active that work on web and native (TODO)
 * Takes care of common issues to make sure hover and active state work as expected.
 */
export const usePointerEvents = ({
	onActive,
	onNotActive,
	onHover,
	onBlur,
}: ActivePropsType & HoverPropsType = {}) => {
	const [isActive, setIsActive] = React.useState(false)
	const [isHovered, setIsHover] = React.useState(false)

	return {
		isActive,
		isHovered,
		pointerProps: {
			onPressIn: React.useCallback(() => {
				if (onActive) {
					onActive()
				}
				setIsActive(true)
			}, [onActive]),
			onPressOut: React.useCallback(() => {
				if (onNotActive) {
					onNotActive()
				}
				setIsActive(false)
			}, [onNotActive]),
			onHoverIn: React.useCallback(
				(e: MouseEvent) => {
					if (e.buttons === 1) {
						setIsActive(true)
					}
					if (!isHovered) {
						if (onHover) onHover()
						setIsHover(true)
					}
				},
				[isHovered, onHover],
			),
			onHoverOut: React.useCallback(() => {
				if (isHovered) {
					if (onBlur) onBlur()
					setIsHover(false)
					setIsActive(false)
				}
			}, [isHovered, onBlur]),
		},
	}
}
