/**
 * Prevents scroll events from escaping the given root (e.g., your app wrapper) into the host page/iframe parent.
 * It stops propagation on wheel/touchmove at the root and only preventsDefault when attempting to scroll past edges.
 * Returns a cleanup function to remove listeners.
 */
export function preventBounceScroll(): () => void {
	const touchStartYById = new Map<number, number>()

	const isAtEdge = (el: HTMLElement, delta: number): boolean => {
		const atTop = el.scrollTop <= 0
		const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1
		const scrollingDown = delta > 0
		const scrollingUp = delta < 0
		return (atTop && scrollingUp) || (atBottom && scrollingDown)
	}

	const onWheel = (e: WheelEvent): void => {
		// Keep the event inside the iframe/root
		e.stopPropagation()
		if (isAtEdge(document.documentElement, e.deltaY)) {
			e.preventDefault()
		}
	}

	const onTouchStart = (e: TouchEvent): void => {
		if (e.touches.length > 0) {
			const touch = e.touches[0]
			if (touch) {
				touchStartYById.set(touch.identifier, touch.clientY)
			}
		}
	}

	const onTouchMove = (e: TouchEvent): void => {
		if (e.touches.length === 0) return
		const touch = e.touches[0]
		if (!touch) return
		const startY = touchStartYById.get(touch.identifier) ?? touch.clientY
		const deltaY = startY - touch.clientY // positive when moving up

		// Keep the event inside the iframe/root
		e.stopPropagation()
		if (isAtEdge(document.documentElement, deltaY)) {
			e.preventDefault()
		}
	}

	document.documentElement.addEventListener("wheel", onWheel, {
		passive: false,
		capture: true,
	})
	document.documentElement.addEventListener("touchstart", onTouchStart, {
		passive: true,
		capture: true,
	})
	document.documentElement.addEventListener("touchmove", onTouchMove, {
		passive: false,
		capture: true,
	})

	return () => {
		document.documentElement.removeEventListener("wheel", onWheel, {
			capture: true,
		} as EventListenerOptions)
		document.documentElement.removeEventListener("touchstart", onTouchStart, {
			capture: true,
		} as EventListenerOptions)
		document.documentElement.removeEventListener("touchmove", onTouchMove, {
			capture: true,
		} as EventListenerOptions)
		touchStartYById.clear()
	}
}
