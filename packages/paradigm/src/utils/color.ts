import { type Color, converter, formatRgb } from "culori"

const rgbConverter = converter("rgb")

export const changeColorAlpha = (color: string | Color, alpha: number) => {
	const rgbColor = rgbConverter(color)
	if (!rgbColor) {
		throw new Error(`changeColorAlpha got an invalid color: ${color}`)
	}
	return formatRgb({ ...rgbColor, alpha })
}
