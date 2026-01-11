// In production, API is served from same origin (Home Assistant ingress)
// In development, API is on localhost:3789
export const baseUrl = import.meta.env.DEV ? "http://localhost:3789" : "."
