/**
 * Prevents bounce/rubber-band scrolling on the document level
 * while allowing normal scrolling within child elements.
 *
 * Useful if an app is rendered in an iFrame and you don't want the full app to bounce scroll.
 */
export function preventBounceScroll(): void {
	const isScrollableAncestor = (target: EventTarget | null): boolean => {
		if (!target || !(target instanceof Element)) return false
		let el: Element | null = target as Element

		// Traverse up the DOM to find a scrollable ancestor
		while (el && el !== document.documentElement && el !== document.body) {
			const style = window.getComputedStyle(el)
			const isOverflowScroll =
				style.overflowY === "auto" ||
				style.overflowY === "scroll" ||
				style.overflow === "auto" ||
				style.overflow === "scroll"

			// If this element is scrollable and has scrollable content, it's safe to allow default
			if (isOverflowScroll && el.scrollHeight > el.clientHeight) {
				return true
			}
			el = el.parentElement
		}
		return false
	}

	const preventBounceScroll = (e: WheelEvent | TouchEvent): void => {
		// If scrolling within a scrollable child element, allow it
		if (isScrollableAncestor(e.target)) {
			return
		}

		// Only prevent bounce at document edges
		if (e instanceof WheelEvent) {
			const atTop = window.scrollY === 0
			const atBottom =
				window.scrollY + window.innerHeight >=
				document.documentElement.scrollHeight
			const scrollingDown = e.deltaY > 0
			const scrollingUp = e.deltaY < 0

			if ((atTop && scrollingUp) || (atBottom && scrollingDown)) {
				e.preventDefault()
			}
		} else if (e instanceof TouchEvent) {
			const atTop = window.scrollY === 0
			const atBottom =
				window.scrollY + window.innerHeight >=
				document.documentElement.scrollHeight

			if (e.touches.length > 0) {
				const touch = e.touches[0]
				if (touch) {
					const touchStartY =
						(e as TouchEventWithStartY).touchStartY ?? touch.clientY
					const isMovingUp = touch.clientY > touchStartY

					if ((atTop && isMovingUp) || (atBottom && !isMovingUp)) {
						e.preventDefault()
					}
				}
			}
		}
	}

	// Track touch start position for direction detection
	const handleTouchStart = (e: TouchEvent): void => {
		if (e.touches.length > 0 && e.touches[0]) {
			;(e as TouchEventWithStartY).touchStartY = e.touches[0].clientY
		}
	}

	document.addEventListener("wheel", preventBounceScroll, { passive: false })
	document.addEventListener("touchstart", handleTouchStart, { passive: true })
	document.addEventListener("touchmove", preventBounceScroll, {
		passive: false,
	})
}

// Extend TouchEvent type to include custom property
interface TouchEventWithStartY extends TouchEvent {
	touchStartY?: number
}
