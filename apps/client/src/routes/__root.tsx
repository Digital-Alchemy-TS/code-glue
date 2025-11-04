import { TanStackDevtools } from "@tanstack/react-devtools"
import {
	createRootRoute,
	HeadContent,
	Link,
	Outlet,
	type RouteComponent,
	Scripts,
} from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import { SizableText, TamaguiProvider } from "tamagui"
import { useSnapshot } from "valtio"
import "unfonts.css"

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

	shellComponent: RootShell,
	component: RootComponent,
	errorComponent: () => <div>Error</div>,
	notFoundComponent: () => <div>Not found</div>,
	ssr: false,
})

function RootShell({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	)
}

function RootComponent() {
	const {
		isReady: storeIsReady,
		apiStatus: { typesReady },
	} = useSnapshot(store)

	const fontsLoaded = true // TODO: implement font loading check

	const appReady =
		fontsLoaded && storeIsReady && (typesReady || store.serverError)

	return (
		<TamaguiProvider config={tamaguiConfig}>
			<Link to="/">
				<SizableText>Home</SizableText>
			</Link>
			<Outlet />
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
		</TamaguiProvider>
	)
}
