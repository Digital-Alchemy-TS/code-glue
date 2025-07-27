// Base URL for API calls - set once during app initialization
export let baseUrl = 'http://localhost:3790'

// Get ingress path from Home Assistant Supervisor API
export async function initializeBaseUrl(): Promise<void> {
  try {
    const supervisorToken = process.env.SUPERVISOR_TOKEN

    if (!supervisorToken) {
      throw new Error('SUPERVISOR_TOKEN environment variable not found')
    }

    // Get list of addons
    const addonsResponse = await fetch('http://supervisor/addons', {
      headers: {
        Authorization: `Bearer ${supervisorToken}`,
        'Content-Type': 'application/json',
      },
    })

    if (!addonsResponse.ok) {
      throw new Error('Failed to fetch addon list from supervisor')
    }

    const addonsData = await addonsResponse.json()

    // Find code-glue addon
    const codeGlueAddon = addonsData.data?.addons?.find((addon: any) => addon.name === 'Code Glue')

    // Get addon info to get ingress URL
    const addonInfoResponse = await fetch(`http://supervisor/addons/${codeGlueAddon.slug}/info`, {
      headers: {
        Authorization: `Bearer ${supervisorToken}`,
        'Content-Type': 'application/json',
      },
    })

    if (!addonInfoResponse.ok) {
      throw new Error('Failed to fetch addon info from supervisor')
    }

    const addonInfo = await addonInfoResponse.json()
    const ingressUrl = addonInfo.data?.ingress_url

    if (ingressUrl) {
      // Extract path from ingress URL
      const url = new URL(ingressUrl, window.location.origin)
      baseUrl = url.pathname.replace(/\/$/, '') // Remove trailing slash
    } else {
      throw new Error('Failed to fetch addon info from supervisor')
    }
  } catch (error) {
    throw new Error('Failed to fetch addon ingress url from supervisor', error)
  }
}
