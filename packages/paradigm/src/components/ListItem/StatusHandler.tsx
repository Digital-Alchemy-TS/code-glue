import { AnimatePresence } from "motion/react"

import { animations } from "../../config/animation.config"
import { MotionView } from "../View"

export type StatusHandlerProps = {
	isDragged: boolean // TODO drag and drop
	isHovered: boolean
	isActive: boolean
	isSelected: boolean
}

export const StatusHandler = ({
	isHovered,
	isActive,
	isSelected,
}: StatusHandlerProps) => {
	return (
		<>
			<AnimatePresence>
				{isHovered && (
					<MotionView
						fillContainer
						layoutId="hovered"
						color={"$normalHover"}
						style={{ opacity: 0.5 }}
						initial={{ opacity: 0 }}
						exit={{ opacity: 0 }}
						animate={{ opacity: 0.5 }}
						transition={animations.slideSpring}
						radius={"$md"}
						layoutDependency={isHovered}
					/>
				)}
			</AnimatePresence>

			{!isSelected && isActive && (
				<MotionView
					fillContainer
					key="active"
					initial={{ opacity: 0 }}
					exit={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={animations.slideSpring}
					color={"$listItemActive"}
					radius={"$md"}
				/>
			)}

			{isSelected && (
				<MotionView
					fillContainer
					layoutId="selected"
					// style={{ opacity: 0.25 }}
					transition={animations.slideSpring}
					color={"$listItemSelected"}
					radius={"$md"}
					layoutDependency={isSelected}
				/>
			)}
		</>
	)
}
