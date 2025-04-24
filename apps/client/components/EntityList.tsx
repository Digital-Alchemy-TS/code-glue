import { YStack, YGroup, SizableText } from 'tamagui'
import { useSnapshot } from 'valtio/react'

import { store } from '../store'

import { EntityListItem } from './EntityListItem'

export const Entities = () => {
  const { synapse } = useSnapshot(store)

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
      <SizableText size="$4">Entities</SizableText>
      <YGroup flexDirection="column" gap={10} marginTop={10} paddingBottom={20}>
        {Array.from(synapse, ([, synapse]) => (
          <EntityListItem key={synapse.id} entity={synapse} />
        ))}
        <EntityListItem />
      </YGroup>
    </YStack>
  )
}
