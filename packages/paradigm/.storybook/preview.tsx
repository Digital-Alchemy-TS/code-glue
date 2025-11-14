import addonA11y from "@storybook/addon-a11y"
import { definePreview } from "@storybook/react-vite"

import { ParadigmProvider } from "@/paradigm"

export default definePreview({
	// 👇 Add your addons here
	addons: [addonA11y()],
	parameters: {
		a11y: {
			options: { xpath: true },
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	decorators: [
		(Story) => (
			<ParadigmProvider>
				<Story />
			</ParadigmProvider>
		),
	],
})
