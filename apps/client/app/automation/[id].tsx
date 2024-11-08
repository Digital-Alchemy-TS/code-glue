import { Editor } from '@monaco-editor/react'
import { useLocalSearchParams } from 'expo-router'
import { Text, View } from 'react-native'
import { useSnapshot } from 'valtio'

import { store } from '../../store'

export default function AutomationDetail() {
  const { id } = useLocalSearchParams()

  const automation = useSnapshot(store.automations.get(id))

  return (
    <View>
      <Text>Automation Name: {automation.name}</Text>
      <Text>Automation ID: {automation.id}</Text>
      <Editor height="400px" defaultLanguage="typescript" defaultValue={automation.body} />
    </View>
  )
}
