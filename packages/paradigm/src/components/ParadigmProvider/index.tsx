import { type TamaguiInternalConfig, TamaguiProvider } from "tamagui"

import paradigmConfig from "../../config/tamagui.config"

export const ParadigmProvider: React.FC<{
	children: React.ReactNode
	/**
	 * Optional Tamagui config to override the default.
	 * Make sure you extend the paradigm config so components continue to work as expected.
	 */
	config?: TamaguiInternalConfig
}> = ({ children, config }) => {
	return (
		<TamaguiProvider config={config || paradigmConfig}>
			{children}
		</TamaguiProvider>
	)
}
