import { Redirect, Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Button, Text, View } from 'react-native'
import { useSnapshot } from 'valtio'

import { Editor } from '../../components/Editor'
import { store } from '../../store'

export default function AutomationDetail() {
  const { id } = useLocalSearchParams<{ id: string }>()

  const globalTypes = useSnapshot(store).globalTypes

  const automation = store.automations.get(id)!
  const automationSnapshot = useSnapshot(automation)
  const [body, setBody] = React.useState(automationSnapshot.body)

  if (!id) {
    return <Redirect href="/" />
  }

  return (
    <View>
      <Stack.Screen options={{ title: automationSnapshot.title }} />
      <Text>Automation Name: {automationSnapshot.title}</Text>
      <Text>Automation ID: {automationSnapshot.id}</Text>
      <Text>Docs: {automationSnapshot.documentation}</Text>
      <Editor
        defaultValue={automationSnapshot.body}
        onChange={(body) => setBody(body)}
        globalTypes={globalTypes}
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
