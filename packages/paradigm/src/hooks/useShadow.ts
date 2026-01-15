import { type Color, converter, formatRgb } from "culori"

import { type ShadowName, shadowStyles } from "../generated/shadows"

/**
 * Get shadow styles for a component
 *
 * @param shadowName - The name of the shadow style from Figma
 * @param color - The color to use for replaceable shadows. Defaults to hsl(0,0%,50%). Accepts hex, rgb(), or hsl()
 * @param forceBoxShadow - If true, forces all shadows to use boxShadow. Defaults to false (uses filter for drop shadows)
 * @returns An object with boxShadow and/or filter that can be spread into a component's style prop
 *
 * @example
 * ```tsx
 * // Drop shadows use filter: drop-shadow by default
 * <View style={{ ...useShadow('control') }} />
 *
 * // Inner shadows always use boxShadow
 * <View style={{ ...useShadow('hole20') }} />
 *
 * // Force all shadows to use boxShadow
 * <View style={{ ...useShadow('elevation1', '#000', true) }} />
 * ```
 */

type ShadowParams = {
	/**
	 * The name of the shadow style from Figma
	 */
	shadowName?: ShadowName | undefined
	/**
	 * The color to use for replaceable shadows. Defaults to gray
	 */
	color?: string | Color | undefined
	/**
	 * If true, forces all shadows to use boxShadow. Defaults to false (uses filter for drop shadows).
	 * Be sure to check safari as it rarely has bugs
	 */
	forceBoxShadow?: boolean | undefined
}

const convertToRGB = converter("rgb")

const defaultColor = "hsl(0, 0%, 50%)"

export const useShadow = ({
	shadowName,
	color = defaultColor,
	forceBoxShadow,
}: ShadowParams) => {
	const emptyResult = {
		all: {
			boxShadow: "",
			filter: "",
		},
		outer: { boxShadow: "", filter: "" },
		inner: { boxShadow: "" },
	}

	// because this is a hook it can be called even when no shadow is specified
	if (!shadowName) return emptyResult

	const customColor = convertToRGB(color)

	if (customColor === undefined) {
		console.warn(`Failed to convert color "${color}" to RGB`)
		return emptyResult
	}

	const outerShadows: string[] = []
	const insetShadows: string[] = []
	const filterShadows: string[] = []

	shadowStyles[shadowName].forEach((shadow) => {
		const { type, offsetX, offsetY, blur, opacity, useCustomColor } = shadow

		const shadowColor = formatRgb(
			useCustomColor
				? { ...customColor, alpha: opacity }
				: convertToRGB({ mode: "rgb", ...shadow.fixedColor, alpha: opacity }),
		)

		// Use boxShadow if forced or if inner shadow
		if (forceBoxShadow || type === "INNER_SHADOW") {
			const isInset = type === "INNER_SHADOW"

			const shadowTarget = isInset ? insetShadows : outerShadows

			shadowTarget.push(
				`${isInset ? "inset " : ""}${offsetX}px ${offsetY}px ${blur}px ${shadowColor}`,
			)
		} else {
			filterShadows.push(
				`drop-shadow(${offsetX}px ${offsetY}px ${blur}px ${shadowColor})`,
			)
		}
	})

	return {
		all: {
			boxShadow: outerShadows.concat(insetShadows).join(", "),
			filter: filterShadows.join(" "),
		},
		outer: {
			boxShadow: outerShadows.join(", "),
			filter: filterShadows.join(" "),
		},
		inner: {
			boxShadow: insetShadows.join(", "),
		},
	}
}
