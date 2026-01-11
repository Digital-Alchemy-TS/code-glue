import React from "react"
import { Dialog, Fieldset, Input, Label, Unspaced, XStack } from "tamagui"

import { Button, Icon } from "@code-glue/paradigm"
import { useRouter } from "@/hooks/useRouter"
import { createLocalAutomation } from "@/store"

export const CreateAutomation = () => {
	const [, navigateTo] = useRouter()

	const [title, setTitle] = React.useState("")
	return (
		<Dialog modal>
			<Dialog.Trigger asChild>
				<Button label="Add Automation" />
			</Dialog.Trigger>

			<Dialog.Portal>
				<Dialog.Overlay
					key="overlay"
					animateOnly={["transform", "opacity"]}
					animation={[
						"quicker",
						{
							opacity: {
								overshootClamping: true,
							},
						},
					]}
					enterStyle={{ opacity: 0 }}
					exitStyle={{ opacity: 0 }}
				/>

				<Dialog.FocusScope focusOnIdle>
					<Dialog.Content
						bordered
						elevate
						key="content"
						animateOnly={["transform", "opacity"]}
						animation={[
							"quicker",
							{
								opacity: {
									overshootClamping: true,
								},
							},
						]}
						enterStyle={{ x: 0, y: 20, opacity: 0 }}
						exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
					>
						<Dialog.Title>Add Automation</Dialog.Title>

						<Fieldset horizontal>
							<Label width={64} htmlFor="name">
								Title
							</Label>
							<Input flex={1} id="name" onChangeText={setTitle} value={title} />
						</Fieldset>

						<XStack>
							<Dialog.Close
								asChild
								onPress={() => {
									const newAutomation = createLocalAutomation({ title })
									navigateTo("automations", { automationId: newAutomation.id })
								}}
							>
								<Button aria-label="Close" label="save" />
							</Dialog.Close>
						</XStack>

						<Unspaced>
							<Dialog.Close asChild>
								<Button icon={Icon.X} />
							</Dialog.Close>
						</Unspaced>
					</Dialog.Content>
				</Dialog.FocusScope>
			</Dialog.Portal>
		</Dialog>
	)
}
