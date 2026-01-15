import { PanelResizer } from "@window-splitter/react"
import React from "react"
import { useTheme } from "tamagui"

import { usePointerEvents } from "../../hooks/usePointerEvents"
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

	const { isHovered, pointerProps } = usePointerEvents()
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
		<PanelResizer
			size="1px"
			style={{
				display: "flex",
				// Sets the grow direction
				alignItems: horizontal ? undefined : "flex-end",
				justifyContent: horizontal ? "flex-start" : undefined,
			}}
			onDragStart={() => {
				setIsDragging(true)
			}}
			onDragEnd={() => {
				setIsDragging(false)
			}}
		>
			<MotionView
				position="relative"
				outlineWidth={1}
				outlineStyle="solid"
				initial="inactive"
				variants={variants}
				animate={animateTo}
				grow
				noShrink
				center
				zIndex={horizontal ? 2 : 1}
			>
				<View
					noShrink
					fillContainer
					{...(horizontal
						? { left: -slop, right: -slop }
						: { top: -slop, bottom: -slop })}
					zIndex={1}
					center
					{...pointerProps}
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
		</PanelResizer>
	)
}
