import { Stack } from 'expo-router'
import React from 'react'

export default function ContentLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
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
