import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Link, Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'
import { Text, View } from 'react-native'
import { useSnapshot } from 'valtio'

import { store } from '../store'

import { useColorScheme } from '@/hooks/useColorScheme'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })
  const { isReady: storeIsReady, automations } = useSnapshot(store)

  const appReady = fontsLoaded && storeIsReady

  useEffect(() => {
    if (appReady) {
      SplashScreen.hideAsync()
    }
  }, [appReady])

  if (!appReady) {
    return null
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={{ width: '100%', height: '100%', flexDirection: 'row' }}>
        <View style={{ width: 270, height: '100%', flexDirection: 'column', backgroundColor: 'grey' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>Automations</Text>
            <Link href="/automation/create">
              <Text>+</Text>
            </Link>
          </View>
          {Array.from(automations, ([, automation]) => (
            <Link key={automation.id} href={`/automation/${automation.id}`}>
              <Text>{automation.title}</Text>
            </Link>
          ))}
        </View>
        <Stack>
          <Stack.Screen name="automation" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </View>
    </ThemeProvider>
  )
}
