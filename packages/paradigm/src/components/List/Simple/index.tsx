import React from "react"

import { Header } from "../Header"
import { ListWrapper } from "../Wrapper"

import type { CommonListProps } from "../types"

type SimpleListProps = CommonListProps & { children?: React.ReactNode }

export const SimpleList = React.memo<SimpleListProps>(function SimpleList({
	children,
	header,
	beforeList,
	afterList,
	...props
}) {
	const [isEmpty, setIsEmpty] = React.useState(
		React.Children.count(children) === 0,
	)

	React.useEffect(() => {
		setIsEmpty(React.Children.count(children) === 0)
	}, [children])

	return (
		<ListWrapper
			beforeList={beforeList}
			afterList={afterList}
			header={header}
			{...props}
			isEmpty={isEmpty}
		>
			{beforeList}
			{header && <Header>{header}</Header>}
			{children}
			{afterList}
		</ListWrapper>
	)
})
