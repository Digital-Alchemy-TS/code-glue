import React from "react"
import {
	createTamagui,
	createTokens,
	PortalProvider,
	TamaguiProvider,
} from "tamagui"

import { baseConfig } from "../../config/tamagui.config"
import { View } from "../View"

import type { ParadigmConfig } from "../../config/paradigm.config"

import "./global.css"

export const ParadigmProvider: React.FC<{
	children: React.ReactNode
	/**
	 * Optional Paradigm config to override the default.
	 */
	config?: ParadigmConfig
}> = ({ children, config: overrides }) => {
	const config = React.useMemo(() => {
		return createTamagui({
			...baseConfig,
			tokens: createTokens({
				...baseConfig.tokens,
				size: {
					...baseConfig.tokens.size,
					...overrides?.size,
				},
				space: {
					...baseConfig.tokens.space,
					...overrides?.space,
				},
			}),
			themes: {
				light: {
					...baseConfig.themes.light,
					...overrides?.themes?.light,
				},
				dark: {
					...baseConfig.themes.dark,
					...overrides?.themes?.dark,
				},
			},
		})
	}, [
		overrides?.size,
		overrides?.space,
		overrides?.themes?.dark,
		overrides?.themes?.light,
	])

	return (
		<TamaguiProvider config={config} defaultTheme="light">
			<PortalProvider shouldAddRootHost>
				<View fillContainer>{children}</View>
			</PortalProvider>
		</TamaguiProvider>
	)
}
