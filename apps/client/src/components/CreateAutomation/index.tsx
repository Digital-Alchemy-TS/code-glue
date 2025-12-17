import React from "react"
import { Dialog, Fieldset, Input, Label, Unspaced, XStack } from "tamagui"

import { Button } from "@code-glue/paradigm"
import { useQuery } from "@/hooks/useQuery"
import { createLocalAutomation } from "@/store"

export const CreateAutomation = () => {
	const [, setCurrentAutomationId] = useQuery(
		useQuery.queries.currentAutomationId,
	)
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
						py="$4"
						px="$6"
						elevate
						rounded="$6"
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
						gap="$4"
					>
						<Dialog.Title>Add Automation</Dialog.Title>

						<Fieldset gap="$4" horizontal>
							<Label width={64} htmlFor="name">
								Title
							</Label>
							<Input flex={1} id="name" onChangeText={setTitle} value={title} />
						</Fieldset>

						<XStack self="flex-end" gap="$4">
							<Dialog.Close
								asChild
								onPress={() => {
									const newAutomation = createLocalAutomation({ title })
									setCurrentAutomationId(newAutomation.id)
								}}
							>
								<Button aria-label="Close" label="save" />
							</Dialog.Close>
						</XStack>

						<Unspaced>
							<Dialog.Close asChild>
								<Button position="absolute" r="$3" size="$2" circular />
							</Dialog.Close>
						</Unspaced>
					</Dialog.Content>
				</Dialog.FocusScope>
			</Dialog.Portal>
		</Dialog>
	)
}
