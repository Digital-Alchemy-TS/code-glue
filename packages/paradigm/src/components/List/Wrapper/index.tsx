import React from "react"

import { ComponentError } from "../../ComponentError"
import { Loading } from "../../Loading"
import { ScrollView } from "../../ScrollView"
import { EmptyContent } from "../EmptyContent"
import { IsInListGroupContext, ListGroup, type ListGroupProps } from "../Group"
import { Header } from "../Header"

/**
 * These are the props that will be exposed to the user. Other props used by list components are below.
 */
export type ExternalWrapperProps = {
	/**
	 * Set this to `true` when the list is loading.
	 */
	isLoading?: boolean
	/**
	 * The content to show if the list is empty instead of the default.
	 */
	emptyContent?: React.ComponentProps<typeof EmptyContent>["children"]
	/**
	 * Anything you want to render before the list (within its scrollview) goes here.
	 *
	 * Note this is only rendered by the wrapper when the list is empty or loading.
	 * Otherwise the list itself should handle it
	 */
	beforeList?: React.ReactElement
	/**
	 * Anything you want to render after the list (within its scrollview) goes here.
	 *
	 * Note this is only rendered by the wrapper when the list is empty or loading.
	 * Otherwise the list itself should handle it
	 */
	afterList?: React.ReactElement
	/**
	 * a header for the list.
	 * Shows up over the list items (when not loading or empty) and scrolls with the list.
	 */
	header?: string
}

type ListWrapperProps = ExternalWrapperProps &
	ListGroupProps & {
		/**
		 * Set this to `true` when the list is empty.
		 * Has a default that can be overwritten with `emptyContent`
		 */
		isEmpty?: boolean
		/**
		 * Is this wrapper wrapping a virtual list?
		 */
		isVirtual?: boolean
		/**
		 * The actual list goes here!
		 */
		children: React.ReactNode
		/**
		 * a header for the list.
		 * Shows up over the list items (when not loading or empty) and scrolls with the list.
		 */
		header?: string
	}

export const ListWrapper = React.memo<ListWrapperProps>(function ListWrapper({
	isLoading = false,
	isEmpty = false,
	isVirtual = false,
	emptyContent,
	children,
	beforeList,
	afterList,
	header,
	...listGroupProps
}) {
	const isInScrollView = React.useContext(ScrollView.IsInContext)
	const isInListGroup = React.useContext(IsInListGroupContext)

	if (Object.keys(listGroupProps).length > 0 && isInListGroup)
		return (
			<ComponentError text="This list is already in a group so any `List.Group` props will be ignored" />
		)

	if (isInListGroup && isVirtual)
		return (
			<ComponentError text="Virtual Lists can not be grouped (under `List.Group`)" />
		)

	if (isInScrollView && isVirtual)
		return (
			<ComponentError text="Virtual Lists should not exist under a `ScrollView`" />
		)

	let wrapperContent = <>{children}</>

	if (isLoading || isEmpty) {
		wrapperContent = (
			<>
				{beforeList}
				{header && <Header>{header}</Header>}
				{isLoading ? <Loading /> : <EmptyContent>{emptyContent}</EmptyContent>}
				{afterList}
			</>
		)
	}

	if (!isInScrollView && !isInListGroup)
		return (
			<ListGroup
				{...listGroupProps}
				noScrollView={isVirtual && !isEmpty && !isLoading}
			>
				{wrapperContent}
			</ListGroup>
		)

	return wrapperContent
})
