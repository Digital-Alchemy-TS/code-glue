import { proxy } from "valtio"

import { baseUrl } from "../utils/baseUrl"
import { automationStore, createAutomation } from "./automation"
import { createSynapseEntity, synapseStore } from "./synapse"
import { createVariable, variableStore } from "./variables"

import type {
	SharedVariables,
	StoredAutomation,
	SynapseEntities,
} from "@code-glue/server/utils/index.mts"
import type { SectionIds } from "@/config"

export const store = proxy({
	isReady: false,
	serverError: false,
	automations: automationStore,
	variables: variableStore,
	synapse: synapseStore,
	automationHeader: "",
	state: {
		currentNavSection: null as SectionIds | null,
		newAutomationTitle: "New Automation",
		currentEditorBody: "",
		isBodyEdited: false,
	},
	apiStatus: {
		typesReady: false,
		synapseReady: false,
		variablesReady: false,
		automationsReady: false,
	},
	typeWriter: {
		mappings: "",
		registry: "",
		services: "",
	},
})

const setupStore = async () => {
	return Promise.all([
		fetch(`${baseUrl}/api/v1/types/hidden`, { method: "GET" }).then(
			(response) => response.text(),
		),
		fetch(`${baseUrl}/api/v1/type-writer`, { method: "GET" }).then((response) =>
			response.json(),
		),
	])
		.then(([header, types]) => {
			store.automationHeader = header
			store.apiStatus.typesReady = true
			store.typeWriter.mappings = types.mappings
			store.typeWriter.registry = types.registry
			store.typeWriter.services = types.services
		})
		.catch(() => {
			store.serverError = true
		})
}

const getAutomationsFromServer = async () => {
	return await fetch(`${baseUrl}/api/v1/automation`, { method: "GET" })
		.then((response) => response.json())
		.then((json: StoredAutomation[]) => {
			json.forEach((automation) => {
				const existingAutomation = store.automations.get(automation.id)

				if (!existingAutomation) {
					createAutomation(automation)
				} else {
					Object.assign(existingAutomation, automation)
				}
			})
			// once we have all the automations mark the store as ready
			store.apiStatus.automationsReady = true
			store.isReady = true
		})
		.catch(() => {
			store.serverError = true
			store.isReady = true
		})
}

const getVariablesFromServer = async () => {
	return await fetch(`${baseUrl}/api/v1/variable`, { method: "GET" })
		.then((response) => response.json())
		.then((json: SharedVariables[]) => {
			json.forEach((variable) => {
				const existingVariable = store.variables.get(variable.id)

				if (!existingVariable) {
					createVariable(variable)
				} else {
					Object.assign(existingVariable, variable)
				}
			})
			store.apiStatus.variablesReady = true
		})
		.catch(() => {
			store.serverError = true
			store.isReady = true
		})
}

const getSynapseFromServer = async () => {
	return await fetch(`${baseUrl}/api/v1/synapse`, { method: "GET" })
		.then((response) => response.json())
		.then((json: SynapseEntities[]) => {
			json.forEach((synapseEntity) => {
				const existingSynapseEntity = store.synapse.get(synapseEntity.id)

				if (!existingSynapseEntity) {
					createSynapseEntity(synapseEntity)
				} else {
					Object.assign(existingSynapseEntity, synapseEntity)
				}
			})
			store.apiStatus.synapseReady = true
		})
		.catch(() => {
			store.serverError = true
			store.isReady = true
		})
}

// Initialize app
async function initializeApp() {
	try {
		// Load all the data
		await Promise.all([
			setupStore(),
			getAutomationsFromServer(),
			getVariablesFromServer(),
			getSynapseFromServer(),
		])
	} catch (error) {
		console.error("Failed to initialize app:", error)
		store.serverError = true
		store.isReady = true
	}
}

// Start the initialization
initializeApp()

export * from "./automation"
