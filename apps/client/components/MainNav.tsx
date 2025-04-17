import { Link } from 'expo-router'
import { YStack, YGroup, SizableText } from 'tamagui'
import { useSnapshot } from 'valtio/react'

import { store } from '../store'

export const MainNav = () => {
  const { automations } = useSnapshot(store)

  return (
    <YStack
      backgroundColor="$background"
      borderBottomWidth={1}
      borderBottomColor="$borderColor"
      paddingTop={10}
      paddingBottom={10}
      paddingLeft={20}
      paddingRight={20}
      width={240}
    >
      <SizableText size="$4">Automations</SizableText>
      <YGroup flexDirection="column" gap={10} marginTop={10} paddingBottom={20}>
        {Array.from(automations, ([, automation]) => (
          <Link key={automation.id} href={`/automation/${automation.id}`}>
            <SizableText size="$3">{automation.title}</SizableText>
          </Link>
        ))}
        <Link href="/automation/create">
          <SizableText size="$3">Create New Automation&hellip;</SizableText>
        </Link>
      </YGroup>
    </YStack>
  )
}
