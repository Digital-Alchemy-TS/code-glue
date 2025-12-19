import type { ViewProps } from "tamagui"

export type UseListItemProps = {
	/**
	 * how tall should this list item be?
	 */
	height: number
	/**
	 * what happens when you interact with this list item?
	 */
	onPress?: ViewProps["onPress"]
	/**
	 * is this list item disabled?
	 * onPress will not work and the item will take on disabled styles
	 */
	isDisabled?: ViewProps["disabled"]
	/**
	 * is this list item loading?
	 */
	isLoading?: boolean
	/**
	 * is this list item currently selected?
	 */
	isSelected?: boolean
	/**
	 * is this list item currently picked in a chooser?
	 */
	isPicked?: boolean
}
