// For development, use localhost
const devServerUrl = 'http://localhost:3789'

// For production, we need to dynamically get the base path from the server
// This handles Home Assistant ingress properly using the X-Ingress-Path header
let productionServerUrl: string | null = null

async function getProductionServerUrl(): Promise<string> {
  if (productionServerUrl !== null) {
    return productionServerUrl
  }

  try {
    // First try to get the base path from the server
    const response = await fetch('./api/v1/base-path')
    const data = await response.json()

    if (data.basePath) {
      productionServerUrl = data.basePath as string
    } else {
      // Fallback to current location base
      productionServerUrl = '.'
    }
  } catch (error) {
    console.warn('Failed to fetch base path, using fallback:', error)
    productionServerUrl = '.'
  }

  return productionServerUrl
}

// Export the server URL - for production it will be dynamically determined
export const getServerUrl = async (): Promise<string> => {
  if (process.env.NODE_ENV === 'production') {
    return await getProductionServerUrl()
  }
  return devServerUrl
}
