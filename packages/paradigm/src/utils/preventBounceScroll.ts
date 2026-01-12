/**
 * Prevents scroll events from escaping the given root (e.g., your app wrapper) into the host page/iframe parent.
 * Allows internal scrollable elements to function while preventing iframe-level scrolling.
 * Returns a cleanup function to remove listeners.
 */
export function preventBounceScroll(): () => void {
	/**
	 * Check if element or any parent can scroll in the direction of the wheel event
	 */
	const canElementScroll = (
		element: Element | null,
		deltaY: number,
	): boolean => {
		let current = element
		while (current && current !== document.documentElement) {
			const el = current as HTMLElement
			const style = window.getComputedStyle(el)
			const overflowY = style.overflowY

			// Check if element has scrollable overflow
			if (
				overflowY === "auto" ||
				overflowY === "scroll" ||
				overflowY === "overlay"
			) {
				const hasScrollableContent = el.scrollHeight > el.clientHeight

				if (hasScrollableContent) {
					// Check if we can scroll in the intended direction
					const scrollingDown = deltaY > 0
					const scrollingUp = deltaY < 0
					const canScrollDown =
						el.scrollTop < el.scrollHeight - el.clientHeight - 1
					const canScrollUp = el.scrollTop > 1

					if (
						(scrollingDown && canScrollDown) ||
						(scrollingUp && canScrollUp)
					) {
						return true
					}
				}
			}

			current = current.parentElement
		}
		return false
	}

	const onWheel = (e: WheelEvent): void => {
		// Always stop propagation to keep events in iframe
		e.stopPropagation()

		// Only prevent default if no scrollable ancestor can handle this scroll
		if (!canElementScroll(e.target as Element, e.deltaY)) {
			e.preventDefault()
		}
	}

	const onTouchMove = (e: TouchEvent): void => {
		// Always stop propagation to keep events in iframe
		e.stopPropagation()

		// For touch, we'd need to track the delta, so just let it through for now
		// The CSS overflow: hidden on body will prevent document scrolling
	}

	// Set overflow hidden on body to prevent document scrolling
	const originalBodyOverflow = document.body.style.overflow
	document.body.style.overflow = "hidden"

	window.addEventListener("wheel", onWheel, {
		passive: false,
	})
	window.addEventListener("touchmove", onTouchMove, {
		passive: false,
	})

	return () => {
		document.body.style.overflow = originalBodyOverflow
		window.removeEventListener("wheel", onWheel)
		window.removeEventListener("touchmove", onTouchMove)
	}
}
