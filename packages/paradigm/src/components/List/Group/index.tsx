import React from "react"

import { ScrollView } from "../../ScrollView"
import { Column, type ViewProps } from "../../View"

import type { ScrollViewProps } from "react-native"

/**
 * These are the props we expose to users
 */
export type ExternalListGroupProps = {
	/**
	 * By default list contents are limited by the narrow/wide media breakpoint.
	 * Set this to `true` to override this behavior.
	 */
	isFullWidth?: boolean
	/**
	 * the background color for the group
	 */
	color?: ViewProps["color"]
	/**
	 * the space between lists inside this group.
	 */
	between?: ViewProps["between"]
}

export type ListGroupProps = ExternalListGroupProps & {
	/**
	 * Bypass adding a `ScrollView` around this group.
	 * This is used by virtual lists as they manage their own scrolling.
	 */
	noScrollView?: boolean
	/**
	 * The actual list goes here!
	 */
	children: React.ReactNode
	/**
	 * The onLayout of the wrapping scrollview. Only available on the top level group.
	 */
	onLayout?: ScrollViewProps["onLayout"]
}

export const IsInListGroupContext = React.createContext(false)

export const ListGroup = React.memo<ListGroupProps>(function ListGroup({
	isFullWidth = false,
	noScrollView = false,
	children,
	color,
	onLayout,
	between,
}) {
	const [onlyOneChild, setOnlyOneChild] = React.useState(false)

	const isInScrollView = React.useContext(ScrollView.IsInContext)
	const isInListGroup = React.useContext(IsInListGroupContext)

	React.useEffect(() => {
		setOnlyOneChild(React.Children.count(children) === 1)
	}, [children])

	// if we have more than one child wrap in a column with between set

	const listGroupContent = (
		<IsInListGroupContext value={true}>
			{onlyOneChild ? (
				children
			) : (
				<Column between={between || "$betweenLists"} pb={"$betweenLists"}>
					{children}
				</Column>
			)}
		</IsInListGroupContext>
	)

	if (!isInListGroup && !isInScrollView && !noScrollView) {
		return (
			<ScrollView
				alwaysBounceVertical
				keyboardDismissMode="interactive"
				keyboardShouldPersistTaps="handled"
				onLayout={onLayout}
				{...(isFullWidth && { flexGrow: 1 })}
				color={color}
			>
				{listGroupContent}
			</ScrollView>
		)
	}

	return listGroupContent
})
