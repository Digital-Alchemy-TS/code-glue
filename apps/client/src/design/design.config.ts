import { createParadigmConfig } from "@code-glue/paradigm"

export const glueDesignConfig = createParadigmConfig({
	sizes: {
		headerHeight: 60,
	},
	themes: {
		light: {
			primary: "#367FEE",
			destructive: "#367FEE",
			color: "#367FEE",
			secondaryColor: "#777D86",
			disabledColor: "#F7E087",
			placeholderColor: "#B2B4B9",
			borderColor: "#E9EBED",
			cardStock: "#F9F9F9",
			background: "#FFFFFF",
			controlShadow: "rgba(18, 18, 18, 0.06)",
			holeShadow: "rgba(18, 18, 18, 0.24)",
		},
	},
})
