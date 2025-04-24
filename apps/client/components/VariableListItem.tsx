import React from 'react'
import { Button, Input, Label, Select, Separator, SizableText, Switch, XStack, YStack } from 'tamagui'

import { store } from '../store'
import { createVariable, Variable } from '../store/variables'

type VariableListItemProps = {
  /**
   * if this is an existing item
   */
  variable?: Variable
}

const defaultValues = {
  title: '',
  type: 'string',
  value: '',
}

export const VariableListItem = ({ variable: variableSnapshot }: VariableListItemProps) => {
  const variable = store.variables.get(variableSnapshot?.id ?? '')

  const [isEditing, setIsEditing] = React.useState(false)
  const [title, setTitle] = React.useState(variableSnapshot ? variableSnapshot.title : defaultValues.title)
  const [type, setType] = React.useState(variableSnapshot ? variableSnapshot.type : defaultValues.type)
  const [value, setValue] = React.useState(variableSnapshot ? variableSnapshot.value : defaultValues.value)

  const clearState = React.useCallback(() => {
    setTitle(variableSnapshot ? variableSnapshot.title : defaultValues.title)
    setType(variableSnapshot ? variableSnapshot.type : defaultValues.type)
    setValue(variableSnapshot ? variableSnapshot.value : defaultValues.value)
  }, [variableSnapshot])

  React.useEffect(() => {
    clearState()
  }, [variableSnapshot, clearState])

  if (isEditing) {
    return (
      <YStack padding={10} backgroundColor="$background">
        <Label htmlFor="title">Title</Label>
        <Input id="title" placeholder="Variable Title" onChangeText={setTitle} value={title} />
        <Label htmlFor="type">Type</Label>
        <Select
          id="type"
          native
          value={type}
          onValueChange={(newType) => {
            if (newType === 'boolean') {
              setValue('false')
            } else {
              setValue('')
            }
            setType(newType)
          }}
        >
          <Select.Trigger>
            <Select.Value />
          </Select.Trigger>

          <Select.Group>
            <Select.Item index={1} value="string">
              <Select.ItemText>String</Select.ItemText>
            </Select.Item>
            <Select.Item index={2} value="number">
              <Select.ItemText>Number</Select.ItemText>
            </Select.Item>
            <Select.Item index={3} value="boolean">
              <Select.ItemText>Boolean</Select.ItemText>
            </Select.Item>
          </Select.Group>
        </Select>
        <Label htmlFor="initial">Initial Value</Label>

        {(() => {
          switch (type) {
            case 'string':
              return (
                <Input
                  id="initial"
                  placeholder="Initial Value"
                  onChangeText={(text) => setValue(text)}
                  value={value}
                />
              )
            case 'number':
              return (
                <Input
                  id="initial"
                  placeholder="Initial Value"
                  inputMode="decimal"
                  onChangeText={(text) => {
                    setValue(text.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1'))
                  }}
                  value={value}
                />
              )
            case 'boolean':
              return (
                <XStack gap="$2" alignItems="center">
                  <Switch
                    id="initial"
                    size="$3"
                    checked={value === 'true'}
                    onCheckedChange={(checked) => setValue(checked ? 'true' : 'false')}
                  >
                    <Switch.Thumb animation="bouncy" />
                  </Switch>
                  <Separator minHeight={20} vertical />
                  <SizableText size="$3">{value}</SizableText>
                </XStack>
              )
            default:
              return null
          }
        })()}
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
              if (variable) {
                variable.update({
                  title,
                  type,
                  value,
                })
              } else {
                createVariable({
                  title,
                  type,
                  value,
                })
              }

              setIsEditing(false)
              clearState()
            }}
          >
            <Button.Text>{variableSnapshot ? 'Update' : 'Create'}</Button.Text>
          </Button>
        </XStack>
      </YStack>
    )
  } else {
    if (variableSnapshot) {
      return (
        <YStack
          onPress={() => {
            setIsEditing(true)
          }}
        >
          <XStack justifyContent="space-between" alignItems="center">
            <YStack alignItems="flex-start">
              <SizableText size="$4">{variableSnapshot.title}</SizableText>
              <SizableText size="$3" backgroundColor="$blue10" color="$gray1" padding={4} borderRadius={4}>
                {variableSnapshot.type}
              </SizableText>
            </YStack>
            <XStack>
              <SizableText size="$4">{variableSnapshot.value}</SizableText>
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
          Create New Variable&hellip;
        </SizableText>
      )
    }
  }
}
