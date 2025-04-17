import { Link } from 'expo-router'
import { YStack, YGroup, SizableText } from 'tamagui'
import { useSnapshot } from 'valtio/react'

import { store } from '../store'

import { Entities } from './EntityList'
import { Variables } from './VariableList'

export const Sidebar = () => {
  return (
    <YStack
      backgroundColor="$background"
      borderBottomWidth={1}
      borderBottomColor="$borderColor"
      paddingTop={10}
      paddingBottom={10}
      width={240}
    >
      <YGroup flexDirection="column" gap={10} marginTop={10} paddingBottom={20}>
        <Variables />
        <Entities />
      </YGroup>
    </YStack>
  )
}
