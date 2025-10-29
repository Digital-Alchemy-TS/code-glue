import { createFactory, type Store } from "@tiltshift/valtio-factory"
import { v4 as uuid } from "uuid"
import { proxyMap } from "valtio/utils"

import { baseUrl } from "../utils/baseUrl"

import type {
	SharedVariableCreateOptions,
	SharedVariables,
	SharedVariableUpdateOptions,
} from "@code-glue/server/utils/contracts/variables.mjs"

const variableFactory = createFactory<SharedVariables>({
	createDate: "",
	documentation: "",
	id: "",
	labels: [],
	lastUpdate: "",
	title: "",
	type: "",
	value: "",
})
	.actions({
		push() {
			return fetch(`${baseUrl}/api/v1/variable/${this.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(this),
			})
				.then((response) => response.json())
				.then((json: SharedVariables) => {
					Object.entries(json).forEach(([key, value]) => {
						this[key as keyof SharedVariables] = value as never
					})
				})
				.catch((error) => {
					console.error("client -> server push error", error)
				})
		},
	})
	.actions({
		update(updates: SharedVariableUpdateOptions) {
			Object.entries(updates).forEach(([key, value]) => {
				this[key as keyof SharedVariables] = value as never
			})

			this.push()
		},
	})
	.onCreate((state) => {
		// push the new automation to the server, should this happen here or via a subscription?
		state.push()
	})

export const createVariable = (initialData: SharedVariableCreateOptions) => {
	const now = new Date().toISOString()

	const variable = variableFactory.create(undefined, {
		id: uuid(),
		createDate: now,
		lastUpdate: now,
		...initialData,
	})

	// add the new variable to the store
	variableStore.set(variable.id, variable)

	return variable
}

export type Variable = Store<typeof variableFactory>

export const variableStore = proxyMap<string, Variable>([])
