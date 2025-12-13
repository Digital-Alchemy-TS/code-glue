import { tr } from "motion/react-client"
import React from "react"
import { PanelResizeHandle } from "react-resizable-panels"
import { useTheme } from "tamagui"

import { useHover } from "../../hooks/useHover"
import { changeColorAlpha } from "../../utils/color"
import { Icon } from "../Icon"
import { MotionView, View } from "../View"

import type { Variants } from "motion"

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
	const hoverDelay = 300 // ms
	const transition = {
		type: "spring",
		visualDuration: 0.3,
		bounce: 0.4,
	} as const

	const { isHovered, hoverProps } = useHover()
	const [isDragging, setIsDragging] = React.useState(false)
	const [animateTo, setAnimateTo] = React.useState(
		"inactive" as "inactive" | "active",
	)
	const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

	const theme = useTheme()

	const background = theme.background.val
	const uiStroke = theme.uiStroke.val
	const uiStrokeTransparent = changeColorAlpha(uiStroke, 0)
	const iconDefaultColor = theme.placeholderColor.val
	const iconActiveColor = theme.primary.val

	React.useEffect(() => {
		if (isDragging) {
			if (timerRef.current) {
				clearTimeout(timerRef.current)
				timerRef.current = null
			}

			setAnimateTo("active")
		}
	}, [isDragging])

	React.useEffect(() => {
		if (isHovered && !isDragging) {
			timerRef.current = setTimeout(() => {
				setAnimateTo("active")
			}, hoverDelay)
		} else if (!isHovered && !isDragging) {
			if (timerRef.current) {
				clearTimeout(timerRef.current)
				timerRef.current = null
			}
			setAnimateTo("inactive")
		}

		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current)
			}
		}
	}, [isHovered, isDragging])

	const sizeProperty = horizontal ? "width" : "height"

	const variants: Variants = {
		inactive: {
			...{ [sizeProperty]: closedSize },
			outlineColor: uiStrokeTransparent,
			backgroundColor: uiStroke,
			transition,
		},
		active: {
			...{ [sizeProperty]: openSize },
			backgroundColor: background,
			outlineColor: uiStroke,
			transition,
		},
	}

	return (
		<PanelResizeHandle
			style={{
				display: "flex",
			}}
			onDragging={setIsDragging}
			hitAreaMargins={{ coarse: 15, fine: slop }}
		>
			<MotionView
				position="relative"
				outlineWidth={1}
				outlineStyle="solid"
				initial="inactive"
				variants={variants}
				animate={animateTo}
				grow
				center
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
					variants={{
						inactive: { [horizontal ? "width" : "height"]: closedSize },
						active: { [horizontal ? "width" : "height"]: openSize },
					}}
					center
					overflow="hidden"
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
