import { Redirect, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Button, Text, View } from 'react-native'
import { useSnapshot } from 'valtio'

import { Editor } from '../../components/Editor'
import { store } from '../../store'

export default function AutomationDetail() {
  const { id } = useLocalSearchParams<{ id: string }>()

  const automationHeader = useSnapshot(store).automationHeader

  const automation = store.automations.get(id)!
  const automationSnapshot = useSnapshot(store.automations.get(id)!)
  const [body, setBody] = React.useState(automationSnapshot.body)

  if (!id) {
    return <Redirect href="/" />
  }

  const fileHeader = automationHeader + '\n// Start Editable\n'
  const fileFooter = '\n// End Editable'

  const bodyStartLine = fileHeader.split('\n').length
  const bodyLines = body.split('\n').length
  const bodyEndLines = bodyStartLine + bodyLines - 1
  const bodyLastLineLength = body.split('\n').slice(-1)[0].length

  return (
    <View>
      <Text>Automation Name: {automationSnapshot.title}</Text>
      <Text>Automation ID: {automationSnapshot.id}</Text>
      <Text>Docs: {automationSnapshot.documentation}</Text>
      <Editor
        defaultValue={fileHeader + automationSnapshot.body + fileFooter}
        onConstraintsChange={({ body }) => setBody(body)}
        constraints={[
          {
            label: 'body',
            range: [bodyStartLine, 1, bodyEndLines, bodyLastLineLength + 1],
            allowMultiline: true,
          },
        ]}
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
