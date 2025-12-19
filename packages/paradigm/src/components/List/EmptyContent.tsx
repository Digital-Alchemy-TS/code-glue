import React from "react"

import { Text } from "../Text"
import { Column } from "../View"

export const EmptyContent = React.memo<{ children?: React.ReactNode }>(
	function ListEmptyContent({ children }) {
		return !children || typeof children === "string" ? (
			<Column grow center>
				<Text
					style={Text.style.header3}
					color={"$secondaryColor"}
					fit={Text.fitValues.wrap}
					_style={{ textAlign: "center" }}
					noUserSelect
				>
					{children || "This list is empty."}
				</Text>
			</Column>
		) : (
			children
		)
	},
)
