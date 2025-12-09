import React from "react"

import { Text } from "../Text"
import { Column } from "../View"

/**
 * Used to show errors inline in Storybook while throwing an error when used in a project.
 */
export const StorybookContext = React.createContext(false)

export const ComponentError: React.FC<{ text: string }> = ({ text }) => {
	const isStorybook = React.useContext(StorybookContext)

	if (!isStorybook) throw new Error(text)

	return (
		<Column center color="red">
			<Text align="center" fit={Text.fitValues.wrap}>
				{text}
			</Text>
		</Column>
	)
}
