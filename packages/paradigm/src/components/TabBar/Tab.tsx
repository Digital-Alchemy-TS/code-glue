import { motion } from "motion/react"

import { animations } from "../../config/animation.config"
import { usePointerEvents } from "../../hooks/usePointerEvents"
import { Text } from "../Text"
import { Column, View } from "../View"

type TabProps = {
	/**
	 * Label for the tab
	 */
	label: string
	/**
	 * Is the tab selected?
	 */
	isActive?: boolean
	/**
	 * Called when the tab is clicked
	 */
	onPress?: () => void
	/**
	 * Unique prefix for layout animations
	 */
	layoutIdPrefix: string
}

export const Tab = ({ label, isActive, onPress, layoutIdPrefix }: TabProps) => {
	const { isHovered, pointerProps } = usePointerEvents()
	return (
		<Column>
			<View
				height={"$tabHeight"}
				center="v"
				px={"$edgeInset"}
				onPress={onPress}
				{...pointerProps}
				cursor="pointer"
			>
				<Text
					style={Text.style.footnote}
					noUserSelect
					letterCase={Text.letterCase.sentence}
					color={isActive || isHovered ? "$primary" : "$color"}
				>
					{label}
				</Text>
			</View>
			{isActive && (
				<motion.div
					layoutId={`${layoutIdPrefix}-tab-indicator`}
					transition={animations.slideSpring}
					layoutDependency={isActive}
					style={{
						position: "absolute",
						bottom: 0,
						left: 0,
						right: 0,
						top: 0,
						borderBottom: "3px solid var(--primary)",
						pointerEvents: "none",
					}}
				/>
			)}
		</Column>
	)
}
