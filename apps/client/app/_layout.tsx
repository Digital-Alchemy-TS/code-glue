import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { ParadigmProvider } from 'paradigm'
import { useEffect } from 'react'
import 'react-native-reanimated'
import { Text, View } from 'react-native'
import { useSnapshot } from 'valtio'

import { MainNav, Variables } from '../components'
import { store } from '../store'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })
  const { isReady: storeIsReady, typesReady } = useSnapshot(store)

  const appReady = fontsLoaded && storeIsReady && (typesReady || store.serverError)

  useEffect(() => {
    if (appReady) {
      SplashScreen.hideAsync()
    }
  }, [appReady])

  if (!appReady) {
    return null
  }

  return (
    <ParadigmProvider>
      {store.serverError && (
        <View style={{ backgroundColor: 'red' }}>
          <Text style={{ color: 'white' }}>Server Error: Can&rsquo;t contact code glue server</Text>
        </View>
      )}

      <View style={{ width: '100%', height: '100%', flexDirection: 'row' }}>
        <MainNav />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="automation" />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="variable" />
        </Stack>
        <Variables />
      </View>
    </ParadigmProvider>
  )
}
