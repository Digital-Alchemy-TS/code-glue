import { useLocalSearchParams } from 'expo-router'
import { Text } from 'react-native'

export default function AutomationDetail() {
  const { id } = useLocalSearchParams()

  return <Text>Automation Detail {id}</Text>
}
