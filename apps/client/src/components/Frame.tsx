import { ScrollView, SizableText, Spacer, XStack, YStack } from "tamagui"

import { Nav } from "./Nav"

/**
 * A simple two-column page layout using Tamagui.
 * Left column is a fixed-width sidebar, right column is flexible content.
 */
export function Frame({
	sidebar,
	children,
	header,
}: {
	/**
	 * Content to render into the left sidebar.
	 */
	sidebar?: React.ReactNode
	/**
	 * Main content area (children).
	 */
	children: React.ReactNode
	/**
	 * Optional header rendered above the main content area.
	 */
	header?: React.ReactNode
}) {
	return (
		<XStack fullscreen>
			<Nav />

			{/* Main content */}
			<YStack flex={1} padding="$4" backgroundColor="#f8f9fb">
				<XStack ai="center" jc="space-between" mb="$3">
					<XStack ai="center" space>
						<SizableText size="$6">App Title</SizableText>
					</XStack>

					{header ?? (
						<SizableText size="$3" color="#666">
							Right header area
						</SizableText>
					)}
				</XStack>

				<YStack
					flex={1}
					borderRadius={8}
					overflow="hidden"
					backgroundColor="#fff"
				>
					{children}
				</YStack>
			</YStack>
		</XStack>
	)
}
