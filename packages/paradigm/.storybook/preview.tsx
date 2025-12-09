import addonA11y from "@storybook/addon-a11y"
import { definePreview } from "@storybook/react-vite"

import { ParadigmProvider } from "@/paradigm"
import { StorybookContext } from "../src/components/ComponentError"

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
			<StorybookContext value={true}>
				<ParadigmProvider>
					<Story />
				</ParadigmProvider>
			</StorybookContext>
		),
	],
})
