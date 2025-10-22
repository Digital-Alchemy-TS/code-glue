// In production, API is served from same origin (Home Assistant ingress)
// In development, API is on localhost:3789
// __DEV__ is the standard React Native/Expo way to detect development mode
// Use '.' to make requests relative to current path (preserves ingress path)
export const baseUrl = __DEV__ ? 'http://localhost:3789' : '.'
