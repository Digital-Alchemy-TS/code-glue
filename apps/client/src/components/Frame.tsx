import { Outlet } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { SizableText, XStack, YStack } from "tamagui"
import { useSnapshot } from "valtio/react"

import { ParadigmProvider } from "@code-glue/paradigm"
import { Editor } from "@/components/Editor"
import tamaguiConfig from "@/design/tamagui.config"
import { store } from "@/store"
import { AutomationDetails } from "./AutomationDetails"
import { Nav } from "./Nav"

export const Frame: React.FC = () => {
	const {
		isReady: storeIsReady,
		apiStatus: { typesReady },
	} = useSnapshot(store)

	const [fontsLoaded, setFontsLoaded] = useState(false)

	useEffect(() => {
		document.fonts.ready.then(() => {
			setFontsLoaded(true)
		})
	}, [])

	const appReady =
		fontsLoaded && storeIsReady && (typesReady || store.serverError)

	return (
		<ParadigmProvider config={tamaguiConfig}>
			{!appReady ? (
				<YStack
					fullscreen
					alignItems="center"
					justifyContent="center"
					background="red"
				>
					<SizableText>Loading...</SizableText>
				</YStack>
			) : (
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
			)}
		</ParadigmProvider>
	)
}
