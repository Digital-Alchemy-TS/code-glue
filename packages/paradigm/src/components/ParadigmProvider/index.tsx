import React from "react"
import { TamaguiProvider } from "tamagui"

import { baseConfig, type ParadigmConfig } from "../../config/paradigm.config"
import tamaguiConfig from "../../config/tamagui.config"
import { View } from "../View"

import "./global.css"

export const ParadigmContext = React.createContext(baseConfig)

export const ParadigmProvider: React.FC<{
	children: React.ReactNode
	/**
	 * Optional Paradigm config to override the default.
	 */
	config?: ParadigmConfig
}> = ({ children, config }) => {
	return (
		<ParadigmContext value={config || baseConfig}>
			<TamaguiProvider config={tamaguiConfig} defaultTheme="light">
				<View fillContainer>{children}</View>
			</TamaguiProvider>
		</ParadigmContext>
	)
}
