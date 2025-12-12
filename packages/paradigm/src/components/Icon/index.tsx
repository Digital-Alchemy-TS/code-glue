/**
 * see `svgTemplate.cjs` for the icon component definition.
 * Icons are genrated from figma using `yarn sync` (`scripts/syncFigma.ts`)
 */
import DragHandle from "./crafted/dragHandle"
import { Icon as IconGenerated } from "./generated"

/**
 * Add crafted icons to generated icons before exporting
 */
const Icon = IconGenerated as typeof IconGenerated & {
	DragHandle: typeof DragHandle
}

Icon.DragHandle = DragHandle

export { Icon }

/**
 * This is somewhat more permissive than it should be,
 * but icons might be defined outside of paradigm and
 * we don't want components to throw in this case.
 */
export type IconComponentType =
	| React.FunctionComponent
	| React.NamedExoticComponent
