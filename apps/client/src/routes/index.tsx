import { createFileRoute, Link } from "@tanstack/react-router"
import { Text, View } from "tamagui"
import { useSnapshot } from "valtio/react"

import { store } from "../store"

export const Route = createFileRoute("/")({ component: App })

function App() {
	const { automations } = useSnapshot(store)

	return <View>Index</View>
}
