import Constants from 'expo-constants'

export const baseUrl =
  Constants.expoConfig?.experiments?.baseUrl === '/'
    ? 'http://localhost:3789' // Development
    : Constants.expoConfig?.experiments?.baseUrl // Production (ingress path)
