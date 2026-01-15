import preview from "@/storybook/preview"
import { Layout } from "."

const meta = preview.meta({
	component: Layout,
})

export const layout = meta.story()

/**
 * probably remove this in favor of a docs page.
 */
