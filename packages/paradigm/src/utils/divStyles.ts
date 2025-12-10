/**
 * These are the styles of a div to make it match our Row / Column components. Useful when web needs an actual dom element (like with motion)
 */
export const divStyles = {
	alignItems: "stretch",
	border: "0 solid black",
	boxSizing: "border-box",
	display: "flex",
	flexBasis: "auto",
	flexDirection: "column",
	margin: 0,
	minHeight: 0,
	minWidth: 0,
	padding: 0,
	position: "relative",
	zIndex: 0,
} as const
