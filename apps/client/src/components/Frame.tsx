import { Outlet } from "@tanstack/react-router"
import { SizableText, TamaguiProvider, View, XStack, YStack } from "tamagui"
import { useSnapshot } from "valtio/react"

import { AutomationDetails } from "./AutomationDetails"
import { Nav } from "./Nav"

import { Editor } from "@/components/Editor"
import tamaguiConfig from "@/design/tamagui.config"
import { store } from "@/store"

export const Frame: React.FC = () => {
	const {
		isReady: storeIsReady,
		apiStatus: { typesReady },
	} = useSnapshot(store)

	const fontsLoaded = true // TODO: implement font loading check

	const appReady =
		fontsLoaded && storeIsReady && (typesReady || store.serverError)

	if (!appReady) {
		return <View>Loading...</View>
	}

	return (
		<TamaguiProvider config={tamaguiConfig}>
			<XStack fullscreen>
				<Nav />

				{/* Main content */}
				<YStack flex={1}>
					<AutomationDetails />

					<YStack flex={1} borderRadius={8}>
						<Editor />
						<Outlet />
					</YStack>
				</YStack>
			</XStack>
		</TamaguiProvider>
	)
}
