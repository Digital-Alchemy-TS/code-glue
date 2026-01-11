import addonA11y from "@storybook/addon-a11y"
import { definePreview } from "@storybook/react-vite"

import { StorybookContext } from "../src/components/ComponentError"
import { ParadigmProvider } from "../src/components/ParadigmProvider"

export default definePreview({
	// 👇 Add your addons here
	addons: [addonA11y()],
	parameters: {
		a11y: {
			options: { xpath: true },
		},
		controls: {
			matchers: {
				color: /(background|color|fill)$/i,
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
