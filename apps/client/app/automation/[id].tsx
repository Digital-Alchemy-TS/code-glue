import { Editor } from '@monaco-editor/react'
import { useLocalSearchParams } from 'expo-router'
import { editor } from 'monaco-editor'
import React from 'react'
import { Button, Text, View } from 'react-native'
import { useSnapshot } from 'valtio'

import { store } from '../../store'

export default function AutomationDetail() {
  const { id } = useLocalSearchParams()
  const editorRef = React.useRef<editor.IStandaloneCodeEditor>(null)
  const automation = store.automations.get(id)

  const automationSnapshot = useSnapshot(store.automations.get(id))

  return (
    <View>
      <Text>Automation Name: {automationSnapshot.title}</Text>
      <Text>Automation ID: {automationSnapshot.id}</Text>
      <Text>Docs: {automationSnapshot.documentation}</Text>
      <Editor
        height="400px"
        defaultLanguage="typescript"
        defaultValue={automationSnapshot.body}
        onMount={(editor) => {
          editorRef.current = editor
        }}
      />
      <Button
        title="save"
        onPress={() => {
          automation.update({ body: editorRef.current.getValue() })
        }}
      />
    </View>
  )
}
