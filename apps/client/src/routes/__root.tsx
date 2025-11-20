import { TanStackDevtools } from "@tanstack/react-devtools"
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"

import "unfonts.css"

import { Frame } from "@/components/Frame"

import type React from "react"

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
	component: Frame,
	errorComponent: () => <div>Error</div>,
	notFoundComponent: () => <div>Not found</div>,
})

function RootShell({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
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
