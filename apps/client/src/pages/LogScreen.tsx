import React from "react"

import {
	Button,
	ButtonRow,
	Column,
	Icon,
	type ScrollViewRef,
	Text,
} from "@code-glue/paradigm"
import { Header } from "@/components/Header"
import { Logs } from "@/components/Logs"

export const LogScreen = () => {
	const scrollViewRef = React.useRef<ScrollViewRef>(null)

	return (
		<Column grow>
			<Header>
				<Text>Logs</Text>
				<ButtonRow>
					<Button
						icon={Icon.ChevronDown}
						isRaised
						onPress={() => {
							scrollViewRef.current?.scrollToEnd({ animated: true })
						}}
					/>
					<Button
						icon={Icon.ChevronUp}
						isRaised
						onPress={() => {
							scrollViewRef.current?.scrollTo({ y: 0, animated: true })
						}}
					/>
				</ButtonRow>
			</Header>
			<Logs ref={scrollViewRef} />
		</Column>
	)
}
