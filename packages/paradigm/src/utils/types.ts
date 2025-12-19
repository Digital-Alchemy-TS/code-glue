import type React from "react"
import type { GestureResponderEvent } from "react-native"

export type Widen<T> = T extends string
	? string
	: T extends number
		? number
		: T extends boolean
			? boolean
			: T extends bigint
				? bigint
				: T extends symbol
					? symbol
					: T extends readonly (infer U)[]
						? readonly Widen<U>[]
						: T extends (infer U)[]
							? Widen<U>[]
							: T extends object
								? { [K in keyof T]: Widen<T[K]> }
								: T
export type OnPressWithRef = (args: {
	ref: React.RefObject<unknown>
	event: GestureResponderEvent
}) => void
