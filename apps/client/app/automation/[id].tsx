import { Redirect, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Button, Text, View } from 'react-native'
import { useSnapshot } from 'valtio'

import { Editor } from '../../components/Editor'
import { store } from '../../store'

export default function AutomationDetail() {
  const { id } = useLocalSearchParams<{ id: string }>()

  const automation = store.automations.get(id)!
  const automationSnapshot = useSnapshot(store.automations.get(id)!)
  const [body, setBody] = React.useState(automationSnapshot.body)

  if (!id) {
    return <Redirect href="/" />
  }

  const fileHeader = `import { TServiceParams } from "@digital-alchemy/core";
import { LIB_HASS } from "@digital-alchemy/hass";
import { LIB_SYNAPSE } from "@digital-alchemy/synapse";
import { LIB_AUTOMATION } from "@digital-alchemy/automation";

const { logger, hass, context, automation, event, synapse, lifecycle, scheduler, config } =
  undefined as TServiceParams;
`

  return (
    <View>
      <Text>Automation Name: {automationSnapshot.title}</Text>
      <Text>Automation ID: {automationSnapshot.id}</Text>
      <Text>Docs: {automationSnapshot.documentation}</Text>
      <Editor
        defaultValue={fileHeader + automationSnapshot.body}
        onChange={setBody}
        constraints={[{ label: 'body', range: [4, 1, 4, 20], allowMultiline: true }]}
      />
      <Button
        title="save"
        onPress={() => {
          automation.update({ body })
        }}
      />
    </View>
  )
}
