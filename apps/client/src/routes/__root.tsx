import { TanStackDevtools } from "@tanstack/react-devtools"
import {
	createRootRoute,
	HeadContent,
	Link,
	Scripts,
} from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import { TamaguiProvider } from "tamagui"
import { useSnapshot } from "valtio"

import { tamaguiConfig } from "../../design/tamagui.config"
import { store } from "../store"

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, shrink-to-fit=no",
			},
			{
				title: "Code Glue",
			},
		],
		links: [
			{
				rel: "icon",
				href: "/favicon-32x32.png",
				type: "image/png",
			},
			{
				rel: "manifest",
				href: "/manifest.json",
			},
		],
	}),

	shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
	const {
		isReady: storeIsReady,
		apiStatus: { typesReady },
	} = useSnapshot(store)

	const fontsLoaded = true // TODO: implement font loading check

	const appReady =
		fontsLoaded && storeIsReady && (typesReady || store.serverError)

	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<Link to="/">Home</Link>
				<div>Store status: {storeIsReady ? "Ready" : "Loading..."}</div>
				<div>API status: {typesReady ? "Ready" : "Loading..."}</div>
				<div>App status: {appReady ? "Ready" : "Loading..."}</div>
				<TamaguiProvider config={tamaguiConfig}>{children}</TamaguiProvider>
				<TanStackDevtools
					config={{
						position: "bottom-right",
						openHotkey: ["Meta", "d"],
						triggerImage: "/dev.png",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	)
}
