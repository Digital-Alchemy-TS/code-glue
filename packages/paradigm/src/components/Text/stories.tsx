import preview from "@/storybook/preview"
import { Column, Row } from "../View"
import { Text } from "./index"

const meta = preview.meta({
	component: Text,
})
export const Story = meta.story({
	render: () => (
		<Column>
			<Row>
				<Column width={200}>
					<Text style={Text.style.headline}>Regular</Text>
					{Object.entries(Text.style).map(([key, value]) => (
						<Text key={key} style={value}>
							{key}
						</Text>
					))}
				</Column>
				<Column grow between={10}>
					<Text _style={{ color: "red" }}>
						Hello I&apos;m red{" "}
						<Text _style={{ color: "blue" }}>and I&apos;m blue.</Text>
						<Text>red again.</Text>
					</Text>
					<Text color="red" style={{ fontSize: 20 }}>
						Hello I&apos;m red and large
						<Text color="blue" px={1}>
							and I&apos;m blue with padding
						</Text>{" "}
						Red again.
					</Text>
					<Text color="red" _style={{ color: "blue" }}>
						This text will be blue.
					</Text>
				</Column>
			</Row>
			<Row>
				<Column color="gray">
					<Column width={300} color="white" between={10}>
						<Text style={Text.style.title1}>Text defaults to ellipsis</Text>
						<Text style={Text.style.title1} fit={Text.fitValues.ellipsis}>
							A single Line of text goes here. It should be cutoff and have an
							ellipsis
						</Text>
						<Text style={Text.style.title1} fit={Text.fitValues.shrink}>
							A single Line of text goes here. It should be smaller than the
							above on iOS.
						</Text>
						<Text style={Text.style.title1} fit={Text.fitValues.wrap}>
							A single Line of text goes here. It should wrap and all be
							visible.
						</Text>
					</Column>
				</Column>
				<Column>
					<Text letterCase={Text.letterCase.title}>
						this text is in <Text color="blue">title</Text> case
					</Text>
					<Text letterCase={Text.letterCase.sentence}>
						this text is in sentence case
					</Text>
					<Text letterCase={Text.letterCase.sentence}>
						this text is in <Text color="blue">sentence</Text> case
					</Text>
					<Text letterCase={Text.letterCase.sentence}>
						<Text color="blue">this</Text> text is in sentence case
					</Text>
					<Text letterCase={Text.letterCase.lower}>
						This Text is in lower case
					</Text>
					<Text letterCase={Text.letterCase.upper}>
						This Text is in upper case
					</Text>
				</Column>
			</Row>
		</Column>
	),
})
