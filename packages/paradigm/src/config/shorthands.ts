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

export const shorthands = {
	m: "margin",
	mb: "marginBottom",
	ml: "marginLeft",
	mr: "marginRight",
	mt: "marginTop",
	mx: "marginHorizontal",
	my: "marginVertical",
	p: "padding",
	pb: "paddingBottom",
	pl: "paddingLeft",
	pr: "paddingRight",
	pt: "paddingTop",
	px: "paddingHorizontal",
	py: "paddingVertical",
} as const
