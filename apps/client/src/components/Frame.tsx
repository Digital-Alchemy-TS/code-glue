import { useEffect, useState } from "react"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"
import { useSnapshot } from "valtio/react"

import { Column, ParadigmProvider, Row, Text } from "@code-glue/paradigm"
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
				<Column
					fullscreen
					alignItems="center"
					justifyContent="center"
					background="red"
				>
					<Text>Loading...</Text>
				</Column>
			) : (
				<Column fullscreen backgroundColor={"red"}>
					<PanelGroup autoSaveId="persistence" direction="horizontal">
						<Panel
							defaultSize={240}
							minSize={240}
							maxSize={580}
							collapsible={false}
							style={{ backgroundColor: "blue" }}
						>
							<Nav />
						</Panel>
						<PanelResizeHandle
							style={{ backgroundColor: "green", width: 10 }}
						/>
						<Panel collapsible={false}>
							<AutomationDetail />
						</Panel>
					</PanelGroup>
				</Column>
			)}
		</ParadigmProvider>
	)
}
