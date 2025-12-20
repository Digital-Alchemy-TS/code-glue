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
			{isHovered && (
				<MotionView
					fillContainer
					layoutId="hovered"
					color={"$normalHover"}
					// opacity={0.5}
					style={{ opacity: 0.5 }}
				/>
			)}

			{!isSelected && isActive && (
				<MotionView
					fillContainer
					key="active"
					initial={{ opacity: 0 }}
					exit={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					color={"$listItemActive"}
				/>
			)}

			{isSelected && (
				<MotionView
					fillContainer
					layoutId="selected"
					color={"$listItemSelected"}
					style={{ opacity: 0.25 }}
				/>
			)}
		</>
	)
}
