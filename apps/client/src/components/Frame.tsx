import { useEffect, useState } from "react"
import { useSnapshot } from "valtio/react"

import {
	Column,
	createParadigmConfig,
	ParadigmProvider,
	Row,
	Text,
} from "@code-glue/paradigm"
import { Editor } from "@/components/Editor"
import { store } from "@/store"
import { AutomationDetails } from "./AutomationDetails"
import { Nav } from "./Nav"

export const Frame = ({ children }: { children?: React.ReactNode }) => {
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
		<ParadigmProvider config={createParadigmConfig()}>
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
							{children}
						</Column>
					</Column>
				</Row>
			)}
		</ParadigmProvider>
	)
}
