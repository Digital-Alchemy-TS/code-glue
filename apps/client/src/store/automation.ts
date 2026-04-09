import { createFactory, type Store } from "@tiltshift/valtio-factory"
import { v4 as uuid } from "uuid"
import { proxyMap } from "valtio/utils"

import { Text } from "@code-glue/paradigm"
import { baseUrl } from "../utils/baseUrl"
import { type AutomationVersion, versionFactory } from "./automationVersion"

import type {
	AutomationCreateOptions as ServerAutomationCreateOptions,
	AutomationUpdateOptions as ServerAutomationUpdateOptions,
	AutomationVersion as ServerAutomationVersion,
	StoredAutomation as ServerStoredAutomation,
} from "@code-glue/server/utils/contracts/automation.mts"

type ClientOnlyState = {
	/**
	 * Has the automation been edited since last save?
	 */
	_isEdited: boolean
	/**
	 * Version history for this automation, keyed by version ID.
	 */
	_versions: Map<string, AutomationVersion>
}

type RequiredServerStoredAutomation = Required<ServerStoredAutomation>

type AutomationType = RequiredServerStoredAutomation & ClientOnlyState

type AutomationUpdateOptions = ServerAutomationUpdateOptions &
	Partial<ClientOnlyState>

export const emptyAutomation: AutomationType = {
	_isEdited: false,
	_versions: new Map(),
	/**
	 * Is this automation turned on and running?
	 */
	active: false,
	/**
	 * ID of the currently active version.
	 */
	activeVersionId: "",
	/**
	 * What HASS area is this automation associated with?
	 */
	area: "",
	/**
	 * The code running this automation.
	 */
	body: "",
	/**
	 * Context ID used for logging. Generated via the title
	 */
	context: "",
	/**
	 * ISO string date of creation.
	 */
	createDate: "",
	/**
	 * Markdown documentation for the automation.
	 */
	documentation: "",
	/**
	 * Icon/emoji used to identify the automation.
	 */
	icon: "",
	/**
	 * Unique identifier for the automation.
	 */
	id: "",
	labels: [],
	/**
	 * ISO string of the last date the automation was updated.
	 */
	lastUpdate: "",
	/**
	 * Not yet used
	 */
	parent: "",
	/**
	 * Title of the automation.
	 */
	title: "",
}

/**
 * All the keys for server-stored automation data (excludes client-only state)
 */
type AutomationDataKey = Extract<keyof RequiredServerStoredAutomation, string>

const automationDataKeys = Object.keys(emptyAutomation).filter(
	(key): key is AutomationDataKey => !key.startsWith("_"),
)

const getNowISO = () => new Date().toISOString()

const automationFactory = createFactory<AutomationType, Record<string, never>>(
	emptyAutomation,
)
	.derived({
		contextId(state) {
			return Text.letterCase.camel(state.title)
		},
	})
	.actions({
		setIsEdited(isEdited: boolean) {
			this._isEdited = isEdited
		},
	})
	.actions({
		getDataValues() {
			return Object.fromEntries(
				automationDataKeys.map((key) => [key, this[key]]),
			) as RequiredServerStoredAutomation
		},
	})
	.actions({
		getServerJSON() {
			return JSON.stringify(this.getDataValues())
		},
	})
	.actions({
		async push() {
			await fetch(`${baseUrl}/api/v1/automation/${this.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: this.getServerJSON(),
			})
				.then((response) => response.json())
				.then((json: ServerStoredAutomation) => {
					Object.entries(json).forEach(([key, value]) => {
						this[key as keyof ServerStoredAutomation] = value as never
					})
				})
				.catch((error) => {
					console.error("client -> server push error", error)
				})
		},
		async delete() {
			await fetch(`${baseUrl}/api/v1/automation/${this.id}`, {
				method: "DELETE",
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error(`Failed to delete automation with id ${this.id}`)
					}
					automationStore.delete(this.id)
				})
				.catch((error) => {
					console.error("client -> server delete error", error)
				})
		},
	})
	.actions({
		update(updates: AutomationUpdateOptions) {
			Object.entries(updates).forEach(([key, value]) => {
				this[key as keyof AutomationType] = value as never
			})

			// push the updates to the server
			this.push()
		},
	})
	.actions({
		/** Insert or update a version in-place so Valtio subscriptions stay stable. */
		upsertVersion(data: ServerAutomationVersion): AutomationVersion {
			const existing = this._versions.get(data.id)
			if (existing) {
				Object.assign(existing, data)
				return existing
			}
			const created = versionFactory.create(undefined, data)
			this._versions.set(data.id, created)
			return created
		},
		getDraftVersion(): AutomationVersion | undefined {
			return [...this._versions.values()].find((v) => v.isDraft)
		},
		getActiveVersion(): AutomationVersion | undefined {
			return [...this._versions.values()].find((v) => v.isActive)
		},
		getVersions(): AutomationVersion[] {
			return [...this._versions.values()]
		},
	})
	.actions({
		async fetchVersions(): Promise<void> {
			await fetch(`${baseUrl}/api/v1/automation/${this.id}/versions`, {
				method: "GET",
			})
				.then((r) => {
					if (!r.ok) throw new Error(`Failed to fetch versions: ${r.status}`)
					return r.json()
				})
				.then((versions: ServerAutomationVersion[]) => {
					versions.forEach((v) => {
						this.upsertVersion(v)
					})
				})
				.catch((error) => {
					console.error(
						"Failed to fetch versions for automation",
						this.id,
						error,
					)
				})
		},
		async createDraftVersion(
			body: string,
			parentVersionId?: string,
		): Promise<AutomationVersion | undefined> {
			return await fetch(`${baseUrl}/api/v1/automation/${this.id}/versions`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ body, parentVersionId }),
			})
				.then((r) => {
					if (!r.ok) throw new Error(`Failed to create draft: ${r.status}`)
					return r.json()
				})
				.then((version: ServerAutomationVersion) => {
					this.upsertVersion(version)
					return this._versions.get(version.id)
				})
				.catch((error) => {
					console.error("Failed to create draft version", error)
					return undefined
				})
		},
		async finalizeVersion(
			versionId: string,
			opts: {
				name?: string
				notes?: string
				wasAutoSaved: boolean
				makeActive?: boolean
			},
		): Promise<AutomationVersion | undefined> {
			return await fetch(
				`${baseUrl}/api/v1/automation/${this.id}/versions/${versionId}/finalize`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(opts),
				},
			)
				.then((r) => {
					if (!r.ok) throw new Error(`Failed to finalize version: ${r.status}`)
					return r.json()
				})
				.then((version: ServerAutomationVersion) => {
					this.upsertVersion(version)
					if (opts.makeActive !== false) {
						for (const v of this._versions.values()) {
							if (v.id !== versionId && v.isActive) v.isActive = false
						}
						this.activeVersionId = version.id
						this.body = version.body
					}
					return this._versions.get(versionId)
				})
				.catch((error) => {
					console.error("Failed to finalize version", error)
					return undefined
				})
		},
		async activateVersion(
			versionId: string,
		): Promise<AutomationVersion | undefined> {
			return await fetch(
				`${baseUrl}/api/v1/automation/${this.id}/versions/${versionId}/activate`,
				{ method: "POST" },
			)
				.then((r) => {
					if (!r.ok) throw new Error(`Failed to activate version: ${r.status}`)
					return r.json()
				})
				.then((activatedVersion: ServerAutomationVersion) => {
					for (const v of this._versions.values()) {
						if (v.isActive) v.isActive = false
					}
					this.upsertVersion(activatedVersion)
					this.activeVersionId = activatedVersion.id
					this.body = activatedVersion.body
					return this._versions.get(versionId)
				})
				.catch((error) => {
					console.error("Failed to activate version", error)
					return undefined
				})
		},
		async deleteVersion(versionId: string): Promise<void> {
			await fetch(
				`${baseUrl}/api/v1/automation/${this.id}/versions/${versionId}`,
				{ method: "DELETE" },
			)
				.then((r) => {
					if (!r.ok) throw new Error(`Failed to delete version: ${r.status}`)
				})
				.then(() => {
					this._versions.delete(versionId)
				})
				.catch((error) => {
					console.error("Failed to delete version", error)
				})
		},
	})

export const createLocalAutomation = (
	initialData: Partial<ServerAutomationCreateOptions> = emptyAutomation,
) => {
	const automation = automationFactory.create(
		{},
		{
			id: uuid(),
			...initialData,
			_versions: proxyMap<string, AutomationVersion>([]),
			createDate: getNowISO(),
			lastUpdate: getNowISO(),
		},
	)

	// add the new automation to the store if it isn't new
	automationStore.set(automation.id, automation)

	return automation
}

export type Automation = Store<typeof automationFactory>

export const automationStore = proxyMap<string, Automation>([])
