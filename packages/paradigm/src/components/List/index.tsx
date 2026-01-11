import { ComponentError } from "../ComponentError"
import { ListGroup } from "./Group"
import { Header } from "./Header"
import { SimpleList } from "./Simple"

import type { CommonListProps } from "./types"

const List: {
	Group: typeof ListGroup
	Header: typeof Header
	Simple: typeof SimpleList
	// Flat: typeof FlatList
	// Section: typeof SectionList
} = () => (
	<ComponentError
		text="List can't be used by itself. Use a list type it provides (List.Simple
  for&nbsp;example)."
	/>
)

List.Group = ListGroup
List.Header = Header

List.Simple = SimpleList
// List.Flat = FlatList
// List.Section = SectionList

export { List }
export type { CommonListProps }
