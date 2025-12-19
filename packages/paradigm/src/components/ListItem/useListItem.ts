import { useTheme } from "tamagui"

import { usePointerEvents } from "../../hooks/usePointerEvents"

import type { BaseListItemProps } from "./BaseListItem"
import type { UseListItemProps } from "./types"

export const useListItem = ({
	onPress,
	isDisabled,
	isLoading,
	height,
}: UseListItemProps) => {
	const theme = useTheme()
	const { isHovered, isActive, pointerProps } = usePointerEvents()

	const isInteractive = !!(onPress && !isDisabled && !isLoading)

	// 🎨 Style

	const baseListItemProps: BaseListItemProps = {
		isHovered,
		isActive,
		isDisabled,
		notInteractive: !isInteractive,
		...pointerProps,
		height,
	} satisfies BaseListItemProps

	return {
		isHovered,
		isActive,
		isDisabled,
		isInteractive,

		color: {
			primaryTextColor: isDisabled ? theme.disabledColor : theme.color,
			secondaryTextColor: isDisabled
				? theme.disabledColor
				: theme.secondaryColor,
		},

		baseListItemProps,
	}
}
