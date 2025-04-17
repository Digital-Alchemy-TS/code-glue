import React from 'react'
import { Button, Input, Label, Select, Separator, SizableText, Switch, XStack, YStack } from 'tamagui'

import { store } from '../store'
import { Synapse, createSynapseEntity, SynapseEntityTypes } from '../store/synapse'

type EntityListItemProps = {
  /**
   * if this is an existing item
   */
  entity?: Synapse
}

const defaultValues = {
  name: '',
  type: SynapseEntityTypes.text,
  value: '',
}

export const EntityListItem = ({ entity: entitySnapshot }: EntityListItemProps) => {
  const entity = store.synapse.get(entitySnapshot?.id ?? '')

  const [isEditing, setIsEditing] = React.useState(false)
  const [name, setName] = React.useState(entitySnapshot ? entitySnapshot.name : defaultValues.name)
  const [type, setType] = React.useState<SynapseEntityTypes>(
    entitySnapshot ? entitySnapshot.type : defaultValues.type,
  )

  const clearState = React.useCallback(() => {
    setName(entitySnapshot ? entitySnapshot.name : defaultValues.name)
    setType(entitySnapshot ? entitySnapshot.type : defaultValues.type)
  }, [entitySnapshot])

  React.useEffect(() => {
    clearState()
  }, [entitySnapshot, clearState])

  if (isEditing) {
    return (
      <YStack padding={10} backgroundColor="$background">
        <Label htmlFor="title">Name</Label>
        <Input id="title" placeholder="Entity Name" onChangeText={setName} value={name} />
        <Label htmlFor="type">Type</Label>
        <Select
          id="type"
          native
          value={type}
          onValueChange={(typeKey) => setType(SynapseEntityTypes[typeKey as SynapseEntityTypes])}
        >
          <Select.Trigger>
            <Select.Value />
          </Select.Trigger>

          <Select.Group>
            {Object.values(SynapseEntityTypes).map((entityType, index) => (
              <Select.Item key={entityType} index={index} value={entityType}>
                <Select.ItemText>{entityType}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Group>
        </Select>

        <XStack gap="$3" justifyContent="flex-end" marginTop={10}>
          <Button
            variant="outlined"
            size="$3"
            onPress={() => {
              setIsEditing(false)
              clearState()
            }}
          >
            <Button.Text>Cancel</Button.Text>
          </Button>

          <Button
            size="$3"
            onPress={() => {
              if (entity) {
                entity.update({
                  name,
                  type,
                })
              } else {
                createSynapseEntity({
                  name,
                  type,
                  suggested_object_id: name,
                  attributes: '',
                  defaultAttributes: '',
                  defaultConfig: '',
                  defaultLocals: '',
                  documentation: '',
                  icon: '',
                  locals: '',
                  labels: [],
                })
              }

              setIsEditing(false)
              clearState()
            }}
          >
            <Button.Text>{entitySnapshot ? 'Update' : 'Create'}</Button.Text>
          </Button>
        </XStack>
      </YStack>
    )
  } else {
    if (entitySnapshot) {
      return (
        <YStack
          onPress={() => {
            setIsEditing(true)
          }}
        >
          <XStack justifyContent="space-between" alignItems="center">
            <YStack alignItems="flex-start">
              <SizableText size="$4">{entitySnapshot.name}</SizableText>
              <SizableText size="$3" backgroundColor="$blue10" color="$gray1" padding={4} borderRadius={4}>
                {entitySnapshot.type}
              </SizableText>
            </YStack>
            <XStack>
              <SizableText size="$4">TODO</SizableText>
            </XStack>
          </XStack>
          <Separator width="100%" />
        </YStack>
      )
    } else {
      return (
        <SizableText
          size="$3"
          cursor="pointer"
          onPress={() => {
            setIsEditing(true)
          }}
        >
          Create New Entity&hellip;
        </SizableText>
      )
    }
  }
}
