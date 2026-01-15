import type { Transition } from "motion"

export const animations = {
	slideSpring: {
		type: "spring",
		bounce: 0.45,
		visualDuration: 0.25,
	},
} as const satisfies Record<string, Transition>
