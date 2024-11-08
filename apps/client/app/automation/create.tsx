import React from 'react'
import { Button, Text, TextInput, View } from 'react-native'

import { createAutomation } from '../../store/automation'

export default function Modal() {
  const [automationName, setAutomationName] = React.useState('')

  return (
    <View>
      <Text>Create Automation</Text>
      <TextInput
        style={{ height: 40, width: '100%', margin: 12, borderWidth: 1, padding: 10 }}
        value={automationName}
        placeholder="Automation Name"
        onChangeText={(text) => {
          setAutomationName(text)
        }}
      />
      <Button
        title="add automation"
        onPress={() => {
          createAutomation({ title: automationName })
        }}
      />
    </View>
  )
}
