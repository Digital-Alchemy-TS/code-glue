import { useEffect, useState } from "react"
import { useSnapshot } from "valtio/react"

import { Center, Layout, ParadigmProvider, Text } from "@code-glue/paradigm"
import { glueDesignConfig } from "@/design/design.config"
import { store } from "@/store"
import { settingsStore } from "@/store/settings"
import { Content } from "./Content"
import { Nav } from "./Nav"

export const Frame = () => {
	const {
		isReady: storeIsReady,
		apiStatus: { typesReady },
	} = useSnapshot(store)
	const { appTheme } = useSnapshot(settingsStore)

	const [fontsLoaded, setFontsLoaded] = useState(false)

	useEffect(() => {
		document.fonts.ready.then(() => {
			setFontsLoaded(true)
		})
	}, [])

	const appReady =
		fontsLoaded && storeIsReady && (typesReady || store.serverError)

	return (
		<ParadigmProvider
			config={glueDesignConfig}
			{...(appTheme !== undefined ? { theme: appTheme } : {})}
		>
			{!appReady ? (
				<Center fillContainer>
					<Text>Loading...</Text>
				</Center>
			) : (
				<Layout.SideNav nav={<Nav />} content={<Content />} />
			)}
		</ParadigmProvider>
	)
}
