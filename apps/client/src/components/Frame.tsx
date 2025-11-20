import { Outlet } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { useSnapshot } from "valtio/react"

import { Column, ParadigmProvider, Row, Text } from "@code-glue/paradigm"
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
				<Column
					fullscreen
					alignItems="center"
					justifyContent="center"
					background="red"
				>
					<Text>Loading...</Text>
				</Column>
			) : (
				<Row fullscreen>
					<Nav />

					{/* Main content */}
					<Column flex={1}>
						<AutomationDetails />

						<Column flex={1} borderRadius={8}>
							<Editor />
							<Outlet />
						</Column>
					</Column>
				</Row>
			)}
		</ParadigmProvider>
	)
}
