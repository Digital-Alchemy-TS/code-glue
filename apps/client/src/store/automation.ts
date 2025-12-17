import { createFactory, type Store } from "@tiltshift/valtio-factory"
import { v4 as uuid } from "uuid"
import { proxyMap } from "valtio/utils"

import { Text } from "@code-glue/paradigm"
import { baseUrl } from "../utils/baseUrl"

import type {
	AutomationCreateOptions as ServerAutomationCreateOptions,
	AutomationUpdateOptions as ServerAutomationUpdateOptions,
	StoredAutomation as ServerStoredAutomation,
} from "@code-glue/server/utils/contracts/automation.mts"

type ClientOnlyState = {
	/**
	 * Has the automation been edited since last save?
	 */
	_isEdited: boolean
}

type RequiredServerStoredAutomation = Required<ServerStoredAutomation>

type AutomationType = RequiredServerStoredAutomation & ClientOnlyState
type AutomationUpdateOptions = ServerAutomationUpdateOptions &
	Partial<ClientOnlyState>

export const emptyAutomation: AutomationType = {
	_isEdited: false,
	/**
	 * Is this automation turned on and running?
	 */
	active: false,
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
	 * draft of the next automation update.
	 */
	draft: "",
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
	/**
	 * Not yet used
	 */
	version: "",
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
		setIsEditied(isEdited: boolean) {
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

export const createLocalAutomation = (
	initialData: Partial<ServerAutomationCreateOptions> = emptyAutomation,
) => {
	const automation = automationFactory.create(
		{},
		{
			id: uuid(),
			...initialData,
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
