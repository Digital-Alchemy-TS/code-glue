export const getApiPath = (path: string) => {
  const base = process.env.EXPO_PUBLIC_INGRESS_PATH || '/'
  return `${base === '/' ? '' : base}${path.startsWith('/') ? path : '/' + path}`
}
