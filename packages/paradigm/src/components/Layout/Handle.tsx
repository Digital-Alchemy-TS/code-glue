import React from "react"
import { PanelResizeHandle } from "react-resizable-panels"
import { useTheme } from "tamagui"

import { useHover } from "../../hooks/useHover"
import { changeColorAlpha } from "../../utils/color"
import { Icon } from "../Icon"
import { MotionView, View } from "../View"

type ResizeHandleProps = {
	/**
	 * how wide/tall is the handle when closed?
	 */
	closedSize?: number
	/**
	 * how wide/tall is the handle when hovered/dragging?
	 */
	openSize?: number
	/**
	 * invisible space to add to either side of the handle to make it easier to hit
	 */
	slop?: number
	/**
	 * add this to make the handle icon horizontal
	 */
	horizontal?: boolean
}
export const ResizeHandle = ({
	closedSize = 1,
	openSize = 10,
	slop = 4,
	horizontal = false,
}: ResizeHandleProps) => {
	const { isHovered, hoverProps } = useHover()
	const [isDragging, setInDragging] = React.useState(false)

	const theme = useTheme()

	const background = theme.background.val
	const uiStroke = theme.uiStroke.val
	const uiStrokeTransparent = changeColorAlpha(uiStroke, 0)
	const iconDefaultColor = theme.placeholderColor.val
	const iconActiveColor = theme.primary.val

	const delay = {
		transition: { delay: 0.2 },
	}

	const variants = {
		inactive: {
			[horizontal ? "width" : "height"]: closedSize,
			outlineColor: uiStrokeTransparent,
			backgroundColor: uiStroke,
		},
		active: {
			[horizontal ? "width" : "height"]: openSize,
			backgroundColor: background,
			outlineColor: uiStroke,
			...delay,
		},
	}

	return (
		<PanelResizeHandle
			style={{
				display: "flex",
			}}
			onDragging={setInDragging}
		>
			<MotionView
				position="relative"
				outlineWidth={1}
				outlineStyle="solid"
				initial="inactive"
				variants={variants}
				animate={isHovered || isDragging ? "active" : "inactive"}
				grow
				center
				overflow
			>
				<View
					noShrink
					fillContainer
					{...(horizontal
						? { left: -slop, right: -slop }
						: { top: -slop, bottom: -slop })}
					zIndex={1}
					center
					{...hoverProps}
				/>
				<MotionView
					initial="inactive"
					variants={{
						inactive: { [horizontal ? "width" : "height"]: closedSize },
						active: { [horizontal ? "width" : "height"]: openSize, ...delay },
					}}
					animate={isHovered || isDragging ? "active" : "inactive"}
					center
				>
					<Icon.DragHandle
						horizontal={!horizontal}
						color={isDragging ? iconActiveColor : iconDefaultColor}
					/>
				</MotionView>
			</MotionView>
		</PanelResizeHandle>
	)
}
