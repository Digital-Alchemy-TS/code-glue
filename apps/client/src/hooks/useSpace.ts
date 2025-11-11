// Spacing Definition

type MarginStyle = {
	marginTop?: number
	marginBottom?: number
	marginLeft?: number
	marginRight?: number
}

type PaddingStyle = {
	paddingTop?: number
	paddingBottom?: number
	paddingLeft?: number
	paddingRight?: number
}

const spaceProperties = {
	m: "margin",
	p: "padding",
} as const

const spaceDirections = {
	t: ["Top"],
	r: ["Right"],
	b: ["Bottom"],
	l: ["Left"],
	x: ["Left", "Right"],
	y: ["Top", "Bottom"],
	a: ["Top", "Right", "Bottom", "Left"],
} as const

const getSpaceProperties = (key: string): string[] => {
	const [a, b] = key.split("")
	const prop = spaceProperties[a as keyof typeof spaceProperties]
	const dirs =
		spaceDirections[b as keyof typeof spaceDirections] || spaceDirections.a

	return dirs.map((dir: string) => prop + dir)
}

type SpaceValue = number | undefined

export type SpaceMarginProps = {
	/**
	 * Margin on all 4 sides
	 */
	m?: SpaceValue
	/**
	 * Margin Top
	 */
	mt?: SpaceValue
	/**
	 * Margin Right
	 */
	mr?: SpaceValue
	/**
	 * Margin Bottom
	 */
	mb?: SpaceValue
	/**
	 * Margin Left
	 */
	ml?: SpaceValue
	/**
	 * Margin Left and Right
	 */
	mx?: SpaceValue
	/**
	 * Margin top and Bottom
	 */
	my?: SpaceValue
}

export type SpacePaddingProps = {
	/**
	 * Padding on all 4 sides
	 */
	p?: SpaceValue
	/**
	 * Padding Top
	 */
	pt?: SpaceValue
	/**
	 * Padding Right
	 */
	pr?: SpaceValue
	/**
	 * Padding Bottom
	 */
	pb?: SpaceValue
	/**
	 * Padding Left
	 */
	pl?: SpaceValue
	/**
	 * Padding Left and Right
	 */
	px?: SpaceValue
	/**
	 * Padding top and Bottom
	 */
	py?: SpaceValue
	/**
	 * index signature
	 */
}

export type SpaceProps = SpaceMarginProps & SpacePaddingProps

export const useSpace = (spaceProps: Partial<SpaceProps>) => {
	const marginStyles: MarginStyle = {}
	const paddingStyles: PaddingStyle = {}

	Object.entries(spaceProps).forEach(([key, value]) => {
		if (value !== undefined) {
			const properties = getSpaceProperties(key)

			properties.forEach((prop) => {
				if (key[0] === "m") {
					marginStyles[prop as keyof MarginStyle] = value
				} else {
					paddingStyles[prop as keyof PaddingStyle] = value
				}
			})
		}
	})

	return {
		marginStyles,
		paddingStyles,
	}
}
