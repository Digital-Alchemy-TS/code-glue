import { AnimatePresence } from "motion/react"

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
				{isHovered && !isSelected && (
					<MotionView
						fillContainer
						layoutId="hovered"
						color={"$normalHover"}
						style={{ opacity: 0.5 }}
						initial={{ opacity: 0 }}
						exit={{ opacity: 0 }}
						animate={{ opacity: 0.5 }}
						transition={{
							type: "spring",
							bounce: 0.45,
							visualDuration: 0.25,
						}}
						radius={"$md"}
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
					transition={{ type: "spring", bounce: 0.45, visualDuration: 0.25 }}
					color={"$listItemActive"}
					radius={"$md"}
				/>
			)}

			{isSelected && (
				<MotionView
					fillContainer
					layoutId="selected"
					style={{ opacity: 0.25 }}
					transition={{ type: "spring", bounce: 0.45, visualDuration: 0.25 }}
					color={"$listItemSelected"}
					radius={"$md"}
				/>
			)}
		</>
	)
}
