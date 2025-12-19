import { getToken, useTheme } from "tamagui"

import { Text } from "../Text"
import { Column, Row, View, type ViewProps } from "../View"
import { BaseListItem, type BaseListItemProps } from "./BaseListItem"
import { useListItem } from "./useListItem"

import type React from "react"
import type { IconComponentType } from "../Icon"
import type { UseListItemProps } from "./types"

export type ListItemProps = Pick<
	BaseListItemProps,
	| "before"
	| "after"
	| "isDisabled"
	| "isLoading"
	| "isSelected"
	| "isPicked"
	| "statusColor"
	| "isSettingsItem"
> &
	Pick<UseListItemProps, "onPress"> & {
		/**
		 * this is the text that will show on the `ListItem` If editable this is also the `value`
		 * Note while this accepts a `React.ReactNode` it needs to be a node that can render within a `Text` component.
		 */
		label: string | React.ReactNode
		/**
		 * an icon to render after the label
		 */
		afterLabelIcon?: IconComponentType
		/**
		 * a color to use for the ListItem label instead of the default
		 */
		color?: ViewProps["color"]
		/**
		 * what should be shown under the label? This essentially be text, but this prop accepts more so that icons and emoji can be used.
		 * Will be rendred within Text
		 */
		secondLine?: string | React.ReactNode
	}

export const ListItem = ({
	before,
	after,
	onPress,
	color,
	isDisabled,
	isLoading,
	label,
	secondLine,
	afterLabelIcon: AfterLabelIcon,
}: ListItemProps) => {
	const theme = useTheme()
	const {
		color: { primaryTextColor, secondaryTextColor },
		baseListItemProps,
	} = useListItem({
		height: getToken("$listItemHeight"),
		onPress,
		isDisabled,
		isLoading,
	})

	const contents = (
		<View>
			<Row center="v">
				<Column>
					<Text
						noUserSelect
						noLineHeight
						style={secondLine ? Text.style.header5 : Text.style.body}
						color={color || primaryTextColor}
					>
						{label}
					</Text>
				</Column>

				{AfterLabelIcon && (
					<View noShrink center pl={"$listItemTextIconSpace"}>
						<AfterLabelIcon
							size={getToken(
								secondLine
									? "$listItemFirstLineIconSize"
									: "$listItemInteriorIconSize",
							)}
							color={theme.placeholderColor.get()}
						/>
					</View>
				)}
			</Row>
			{secondLine && (
				<Text mt={2} color={secondaryTextColor}>
					{secondLine}
				</Text>
			)}
		</View>
	)

	return (
		<BaseListItem
			{...baseListItemProps}
			before={before}
			after={after}
			onPress={onPress}
		>
			{contents}
		</BaseListItem>
	)
}
