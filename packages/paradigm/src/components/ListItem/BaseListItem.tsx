import React from "react"
import { ActivityIndicator } from "react-native-web"
import { getToken, useTheme, type ViewProps } from "tamagui"

import { ComponentError } from "../ComponentError"
import { Icon } from "../Icon"
import { IsInSettingsListContext } from "../SettingsList/context"
import { Spacer } from "../Spacer"
import { Row, View } from "../View"
import { StatusHandler, type StatusHandlerProps } from "./StatusHandler"

import type { UseListItemProps } from "./types"

export type BaseListItemProps = UseListItemProps & {
	/**
	 * component that shows up before the text.
	 */
	before?: React.ReactNode
	/**
	 * component that shows up after the text.
	 */
	after?: React.ReactNode
	/**
	 * the color for the status dot, if any
	 */
	statusColor?: ViewProps["color"]
	/**
	 * Is the list item currently hovered?
	 */
	isHovered: boolean
	/**
	 * Is the list item currently active?
	 */
	isActive: boolean
	/**
	 * Is the list item disabled?
	 */
	isDisabled?: boolean
	/**
	 * is the list item currently being dragged?
	 */
	isDragged?: boolean
	/**
	 * Is the list item floating (either being dragged or dropped and animating)
	 */
	isFloating?: boolean
	/**
	 * if this is true the following props will not work:
	 * `onPress`, `onHoverStateChange`, `onActiveStateChange`
	 *
	 * set by `useListItem`
	 */
	notInteractive: boolean
	/**
	 * set to true if this is a settings list item
	 */
	isSettingsItem?: boolean
	/**
	 * a StatusHandler like component for handling the items status.
	 * defaults to `StatusHandler` from `ListItem
	 */
	statusHandlerComponent?: (props: StatusHandlerProps) => React.ReactElement
}

export const BaseListItem = ({
	before,
	after,
	children,
	height,
	onPress,
	statusColor,
	isDragged = false,
	isHovered,
	isActive,
	isDisabled,
	isLoading = false,
	isSelected = false,
	isPicked = false,
	isSettingsItem,
	statusHandlerComponent = StatusHandler,
	...otherProps
}: BaseListItemProps & { children: React.ReactNode }) => {
	const theme = useTheme()
	const isInSettings = React.useContext(IsInSettingsListContext)
	const isBeingDraggedOver = false // TODO Add drag and drop support

	const [active, setActive] = React.useState(isActive || isBeingDraggedOver)

	React.useEffect(() => {
		setActive(isActive || isBeingDraggedOver)
	}, [isActive])

	// No nos.
	if (isInSettings && !isSettingsItem)
		return <ComponentError text="ListItem can't be used in a SettingsList" />

	// Yes yeses.
	const StatusHandlerComponent = statusHandlerComponent

	return (
		<Row
			height={height}
			px={"$edgeInset"}
			onPress={onPress}
			disabled={!!isDisabled}
			cursor={onPress && !isDisabled ? "pointer" : undefined}
			{...otherProps}
		>
			<Row height={height} grow px={"$listItemEdgeInset"} center="v">
				{before && (
					<View mr={"$listItemBetweenItems"} noShrink>
						{before}
					</View>
				)}

				{isLoading && (
					<View noShrink mr={"$listItemBetweenItems"}>
						<ActivityIndicator />
					</View>
				)}

				<Row grow>{children}</Row>

				{!!(after || isPicked) && (
					<Row noShrink justify="flex-start" center="v">
						{after}
						{isPicked && (
							<>
								<Spacer size={"$space.listItemBetweenItems"} />
								<Icon.Check
									size={getToken("$listItemAfterIconSize")}
									color={theme.primary.get()}
								/>
							</>
						)}
					</Row>
				)}

				{statusColor && (
					<View
						position="absolute"
						top={"$listItemStatusPosition"}
						right={"$listItemStatusPosition"}
						radius={"$circle"}
						color={statusColor}
						width={"$listItemStatusSize"}
						height={"$listItemStatusSize"}
					/>
				)}

				<View fillContainer zIndex="$below">
					<StatusHandlerComponent
						isDragged={isDragged}
						isActive={active}
						isHovered={isHovered}
						isSelected={isSelected}
					/>
				</View>
			</Row>
		</Row>
	)
}
