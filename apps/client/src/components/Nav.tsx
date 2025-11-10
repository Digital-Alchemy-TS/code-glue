import { Link } from "@tanstack/react-router"
import { SizableText, YGroup, YStack } from "tamagui"
import { useSnapshot } from "valtio/react"

import { store } from "../store"

export const Nav = () => {
	const { automations } = useSnapshot(store)

	return (
		<YStack
			backgroundColor="$CardStock"
			borderRightWidth={1}
			borderRightColor="$UIStroke"
			paddingTop={10}
			paddingBottom={10}
			paddingLeft={20}
			paddingRight={20}
			width={240}
		>
			<Link to="/">
				<SizableText size="$4">Home</SizableText>
			</Link>
			<YGroup flexDirection="column" gap={10} marginTop={10} paddingBottom={20}>
				{Array.from(automations, ([, automation]) => (
					<Link
						key={automation.id}
						to="/automation/$id"
						params={{ id: automation.id }}
					>
						<SizableText size="$3">{automation.title}</SizableText>
					</Link>
				))}
			</YGroup>
		</YStack>
	)
}
