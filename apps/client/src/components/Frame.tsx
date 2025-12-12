import { useEffect, useState } from "react"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"
import { useSnapshot } from "valtio/react"

import {
	Center,
	Column,
	Layout,
	ParadigmProvider,
	Row,
	Text,
} from "@code-glue/paradigm"
import { glueDesignConfig } from "@/design/design.config"
import { store } from "@/store"
import { AutomationDetail } from "./AutomationDetail"
import { Nav } from "./Nav"

export const Frame = () => {
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
		<ParadigmProvider config={glueDesignConfig}>
			{!appReady ? (
				<Center fillContainer>
					<Text>Loading...</Text>
				</Center>
			) : (
				<Layout.HorizontalNav nav={<Nav />} content={<AutomationDetail />} />
			)}
		</ParadigmProvider>
	)
}
