/**
 * see `svgTemplate.cjs` for the icon component definition. Icons are genrated from figma using `yarn sync`.
 */

export { Icon } from "./generated"

/**
 * This is somewhat more permissive than it should be,
 * but icons might be defined outside of paradigm and
 * we don't want components to throw in this case.
 */
export type IconComponentType =
	| React.FunctionComponent
	| React.NamedExoticComponent
