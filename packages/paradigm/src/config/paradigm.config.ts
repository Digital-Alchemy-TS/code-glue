export const baseConfig = {
	sizes: {
		headerHeight: 55,
	},
}

export type ParadigmConfig = typeof baseConfig

export const createParadigmConfig = (
	overrides: Partial<ParadigmConfig> = {},
) => {
	return {
		...baseConfig,
		...overrides,
	}
}
