import { response } from '$lib/server/utils'
import { BASE_URL } from '$lib/client/consts'
import { getWeatherData } from '$lib/server/services'
import { AVAIBLE_ENDPOINTS } from '$lib/server/consts'

/**
 * @type {import('./$types').RequestHandler}
 * @see https://kit.svelte.dev/docs/routing#endpoints
 */
export async function GET (event) {
  const {
    params,
    getClientAddress,
    url: { searchParams }
  } = event
  const { endpoint = '' } = params
  const query = searchParams.get('q') ?? getClientAddress()

  const isNotFromAppItself = !(event.request.url === BASE_URL)
  const isNotAvailableEndpoint = !AVAIBLE_ENDPOINTS.includes(endpoint)

  if (isNotFromAppItself) {
    return response(null, 418)
  }

  if (isNotAvailableEndpoint) {
    return response({ error: { message: 'API request url is invalid' } }, 400)
  }

  try {
    const data = await getWeatherData({ endpoint, query })
    if (data?.error) return response({ error: data.error }, 400)
    return response({ data }, 200)
  } catch (error) {
    return response({ error: { message: 'Request failed' } }, 410)
  }
}
