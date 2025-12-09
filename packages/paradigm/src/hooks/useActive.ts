import React from "react"

export type ActivePropsType = {
	onActive?: () => void
	onNotActive?: () => void
}

export const useActive = ({ onActive, onNotActive }: ActivePropsType = {}) => {
	const [isActive, setIsActive] = React.useState(false)

	return {
		isActive,
		activeProps: {
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
		},
	}
}
