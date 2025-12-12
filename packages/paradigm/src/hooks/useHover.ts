import React from "react"

export type HoverPropsType = {
	onHover?: () => void
	onBlur?: () => void
}

export const useHover = ({ onHover, onBlur }: HoverPropsType = {}) => {
	const [isHovered, setIsHover] = React.useState(false)

	return {
		isHovered: isHovered,
		hoverProps: {
			onMouseEnter: React.useCallback(() => {
				if (!isHovered) {
					if (onHover) onHover()
					setIsHover(true)
				}
			}, [isHovered, onHover]),
			onMouseLeave: React.useCallback(() => {
				if (isHovered) {
					if (onBlur) onBlur()
					setIsHover(false)
				}
			}, [isHovered, onBlur]),
		},
	}
}
