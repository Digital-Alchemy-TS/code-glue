import Constants from 'expo-constants'

const appBaseUrl = Constants.expoConfig?.experiments?.baseUrl

export const baseUrl =
  appBaseUrl === './'
    ? 'http://localhost:3790' // Development
    : appBaseUrl // Production (ingress path)
