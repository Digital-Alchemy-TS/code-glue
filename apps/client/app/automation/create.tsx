import Editor from '@monaco-editor/react'
import { Stack } from 'expo-router'
import { editor } from 'monaco-editor'
import React from 'react'
import { Button, Text, TextInput, View } from 'react-native'

import { createAutomation } from '../../store/automation'

export default function Modal() {
  const editorRef = React.useRef<editor.IStandaloneCodeEditor>(null)
  const [automationName, setAutomationName] = React.useState('')

  return (
    <View>
      <Stack.Screen options={{ title: 'Create New Automation' }} />
      <Text>Create Automation</Text>
      <TextInput
        style={{ height: 40, width: '100%', margin: 12, borderWidth: 1, padding: 10 }}
        value={automationName}
        placeholder="Automation Name"
        onChangeText={(text) => {
          setAutomationName(text)
        }}
      />
      <Editor
        height="400px"
        defaultLanguage="typescript"
        defaultValue="// automation code here"
        onMount={(editor) => {
          editorRef.current = editor
        }}
      />
      <Button
        title="add automation"
        onPress={() => {
          createAutomation({ title: automationName, body: editorRef.current.getValue() })
        }}
      />
    </View>
  )
}
