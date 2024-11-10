import { Slot, Stack } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

export default function ContentLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="create"
        options={{
          presentation: 'modal',
        }}
      />
    </Stack>
  )
}
