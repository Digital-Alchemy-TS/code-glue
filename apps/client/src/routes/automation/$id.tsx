import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { useSnapshot } from "valtio/react"

import { Editor } from "../../components/Editor"
import { store } from "../../store"

export const Route = createFileRoute("/automation/$id")({
	component: RouteComponent,
})

function RouteComponent() {
	const { id } = Route.useParams()

	const fileHeader = useSnapshot(store).automationHeader

	const automation = store.automations.get(id)!
	const automationSnapshot = useSnapshot(automation)
	const [body, setBody] = useState(automationSnapshot.body)

	return (
		<div>
			<div>Automation ID: "/automation/{id}"!</div>
			<Editor
				path={`/automations/${automationSnapshot.id}.ts`}
				defaultValue={automationSnapshot.body}
				onChange={(body) => setBody(body)}
				fileHeader={fileHeader}
			/>
			<button
				type="button"
				title="save"
				onClick={() => {
					automation.update({ body })
				}}
			/>
		</div>
	)
}
