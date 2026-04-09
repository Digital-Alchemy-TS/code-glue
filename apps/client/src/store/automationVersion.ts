import { createFactory, type Store } from "@tiltshift/valtio-factory"

import { baseUrl } from "../utils/baseUrl"

import type {
	AutomationVersionUpdateOptions,
	AutomationVersion as ServerAutomationVersion,
} from "@code-glue/server/utils/contracts/automation.mts"

const emptyVersion: ServerAutomationVersion = {
	automationId: "",
	body: "",
	createDate: "",
	id: "",
	isActive: false,
	isDraft: false,
	name: "",
	notes: "",
	parentVersionId: "",
	wasAutoSaved: false,
	writtenByAi: false,
}

export const versionFactory = createFactory<ServerAutomationVersion>(
	emptyVersion,
).actions({
	async update(updates: AutomationVersionUpdateOptions): Promise<void> {
		Object.assign(this, updates)
		await fetch(
			`${baseUrl}/api/v1/automation/${this.automationId}/versions/${this.id}`,
			{
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(updates),
			},
		)
			.then((r) => {
				if (!r.ok) throw new Error(`Failed to update version: ${r.status}`)
				return r.json()
			})
			.then((version: ServerAutomationVersion) => {
				Object.assign(this, version)
			})
			.catch((error) => {
				console.error("Failed to update version", error)
			})
	},
})

export type AutomationVersion = Store<typeof versionFactory>
