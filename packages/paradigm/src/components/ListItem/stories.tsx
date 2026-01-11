import preview from "@/storybook/preview"
import { List } from "../List"
import { Column } from "../View"
import { ListItem } from "./ListItem"

const meta = preview.meta({
	component: ListItem,
})

const ListContainer: React.FC<{
	header?: string
	children: React.ReactNode
}> = ({ children, header }) => {
	return (
		<Column width={320} height={600} noShrink color={"$cardStock"}>
			<List.Simple header={header}>{children}</List.Simple>
		</Column>
	)
}

export const Default = meta.story({
	render: () => (
		<ListContainer header="Default List Items">
			<ListItem onPress={() => alert("hello")} label="Pressable" />
			<ListItem label="No Press" />
			<ListItem label="Single Line that overflows. This text will not fit in the provided area." />
		</ListContainer>
	),
})
