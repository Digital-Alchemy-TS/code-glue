import { Text } from "../../Text"
import { Row } from "../../View"

export type ListHeaderProps = {
	/**
	 * Text to show above all list items.
	 */
	children?: string
	/**
	 * Is this header sticky?
	 * Set to true if being rendered in a section list or anything else that has headers stick to the top of the list.
	 * TODO Use this to set a blur on the wrapping View (Row)
	 */
	isSticky?: boolean
}

export const Header = ({ children, isSticky }: ListHeaderProps) => {
	return (
		<Row
			noShrink
			center="v"
			height={isSticky ? "$listHeaderHeightSticky" : "$listHeaderHeight"}
			px={"$edgeInset"}
		>
			<Text
				noUserSelect
				style={Text.style.header6}
				letterCase={Text.letterCase.sentence}
			>
				{children}
			</Text>
		</Row>
	)
}
