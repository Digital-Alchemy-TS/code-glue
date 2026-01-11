import {
	motion,
	type Transition,
	useMotionValue,
	useTransform,
} from "motion/react"
import React from "react"
import { useTheme } from "tamagui"

import { useShadow } from "../../hooks/useShadow"
import { divStyles } from "../../utils/divStyles"

const width = 50
const height = 30

const handleWrapHeight = height
const handleWrapWidth = handleWrapHeight * 1.2

const handleFalse = 0
const handleTrue = width - handleWrapWidth

const handleMargin = 2

const handleSize = handleWrapHeight - handleMargin * 2
const handleWidthDown = handleWrapWidth - handleMargin * 2

const transition = {
	type: "spring",
	visualDuration: 0.2,
	bounce: 0.2,
} satisfies Transition

type SwitchProps = {
	value: boolean
	onValueChange?: (value: boolean) => void
	isDisabled?: boolean
}

export const Switch = ({
	value,
	onValueChange,
	isDisabled = false,
}: SwitchProps) => {
	const theme = useTheme()

	// we want actual theme values so we can use them in motion transforms
	const gray = theme.switchFalseBackground.val
	const green = theme.switchTrueBackground.val

	const pressTimeout = React.useRef<number | undefined>(undefined)

	// This value is used to decide if the handle should grow from the left or the right.
	const [flexToggle, setFlexToggle] = React.useState(value)

	// internal state for value. Used to change the state on drag without changing value.
	const [switchState, setSwitchState] = React.useState(value)

	// used to stop both tap and mouse up from both toggleing at the same time
	const [isTapped, setIsTapped] = React.useState(false)

	const [handlePressed, setHandlePressed] = React.useState(false)
	const [mouseOver, setMouseOver] = React.useState(false)

	const { all: shadow } = useShadow({
		shadowName: "elevation1",
		forceBoxShadow: true,
	})

	const setValue = (newValue: boolean) => {
		if (!isDisabled) {
			setSwitchState(newValue)
			onValueChange?.(newValue)
		}
	}

	const toggleValue = () => {
		if (!isDisabled) {
			setSwitchState((prevValue) => {
				const newValue = !prevValue
				onValueChange?.(newValue)
				return newValue
			})
		}
	}

	const handleTap = () => {
		isTapped && !isDisabled && toggleValue()
	}

	const handlePosition = useMotionValue(value ? handleTrue : handleFalse)

	const backgroundColor = useTransform(
		handlePosition,
		[handleFalse, handleTrue],
		[gray, green],
	)

	return (
		<motion.div
			animate={switchState.toString()}
			role="switch"
			aria-checked={value}
			tabIndex={0}
			onTapStart={() => {
				setIsTapped(true)
			}}
			onTap={handleTap}
			onMouseEnter={() => setMouseOver(true)}
			onMouseLeave={() => setMouseOver(false)}
			onKeyPress={(e) => {
				// toggle on spacebar
				e.key === " " && toggleValue()
			}}
			style={{
				...divStyles,
				width,
				height,
				borderRadius: height / 2,
				backgroundColor,
				cursor: isDisabled
					? "not-allowed"
					: mouseOver && handlePressed
						? "grabbing"
						: "pointer",
				userSelect: "none",
				opacity: isDisabled ? 0.6 : undefined,
			}}
		>
			<motion.div
				onPan={(_event, info) => {
					if (!isDisabled) {
						setSwitchState(
							value
								? info.offset.x >= -handleSize
								: info.offset.x >= handleSize,
						)
					}
				}}
				onMouseDown={(e) => {
					// stop the cursor from turning into a text select
					e.preventDefault()
				}}
				onPanStart={() => {
					// we're dragging the handle so don't toggle on touch up
					setIsTapped(false)
				}}
				onPanEnd={() => {
					!mouseOver && setValue(switchState)
				}}
				variants={{
					true: { x: handleTrue },
					false: { x: handleFalse },
				}}
				onUpdate={(latest: { x: number }) => {
					setFlexToggle(latest.x > handleTrue / 2)
				}}
				transition={transition}
				style={{
					touchAction: "pan-x",
					x: handlePosition,
					width: handleWrapWidth,
					height: handleWrapHeight,
					display: "flex",
					flex: 1,
					flexDirection: flexToggle ? "row-reverse" : "row",
				}}
			>
				<motion.div
					onTapStart={() => {
						if (!isDisabled) {
							pressTimeout.current = window.setTimeout(() => {
								setHandlePressed(true)
							}, 75)
						}
					}}
					onTapCancel={() => {
						clearTimeout(pressTimeout.current)
						setHandlePressed(false)
					}}
					onTap={() => {
						clearTimeout(pressTimeout.current)
						setHandlePressed(false)
					}}
					animate={handlePressed ? "down" : "up"}
					variants={{
						down: { width: handleWidthDown },
						up: { width: handleSize },
					}}
					transition={transition}
					style={{
						margin: 2,
						width: handleSize,
						height: handleSize,
						borderRadius: 25,
						backgroundColor: "white",
						...(!isDisabled ? shadow : {}),
					}}
				/>
			</motion.div>
		</motion.div>
	)
}
