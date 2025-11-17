import { Link } from "@tanstack/react-router"
import { H3, SizableText, View, XStack, YGroup, YStack } from "tamagui"
import { useSnapshot } from "valtio/react"

import { store } from "../store"

export const Nav = () => {
	const { automations } = useSnapshot(store)

	return (
		<YStack
			backgroundColor="$cardStock"
			borderRightColor="$borderColor"
			borderRightWidth="$size.stroke"
			width={240}
		>
			<XStack alignItems="center" background="$background" height={49}>
				<View mx={12}>
					<img
						src="./favicon-196x196.png"
						alt="CodeGlue"
						width={42}
						height={42}
						paddingLeft={6}
						paddingRight={6}
					/>
				</View>

				<H3>Code Glue</H3>
			</XStack>
			<YGroup
				flexDirection="column"
				gap={10}
				marginTop={10}
				padding="$space.edgeInset"
			>
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
