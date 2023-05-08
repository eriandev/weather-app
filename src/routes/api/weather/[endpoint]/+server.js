import { response } from '$lib/server/utils'
import { BASE_URL } from '$lib/client/consts'
import { API_REQUEST_OPTIONS, API_URL, AVAIBLE_ENDPOINTS } from '$lib/server/consts'

/**
 * @type {import('./$types').RequestHandler}
 * @see https://kit.svelte.dev/docs/routing#endpoints
 */
export async function GET ({ fetch, getClientAddress, params, url }) {
  const { endpoint = '' } = params
  const query = url.searchParams.get('q') ?? getClientAddress()

  const isNotFromAppItself = !(BASE_URL === url.origin)
  const isNotAvailableEndpoint = !AVAIBLE_ENDPOINTS.includes(endpoint)

  if (isNotFromAppItself) {
    return response(null, 418)
  }

  if (isNotAvailableEndpoint) {
    return response({ error: { message: 'API request url is invalid' } }, 400)
  }

  try {
    const GET_WEATHER_DATA_URL = `${API_URL}/${endpoint}.json?q=${query}`
    const apiResponse = await fetch(GET_WEATHER_DATA_URL, API_REQUEST_OPTIONS)
    /** @type {WeatherEndpointResponse} */
    const data = await apiResponse.json()

    if (data?.error) return response({ error: data.error }, 400)
    return response(data, 200)
  } catch (error) {
    console.warn(error)
    return response({ error: { message: 'Request failed' } }, 410)
  }
}

/**
 * @typedef WeatherEndpointResponse
 * @type {import('$lib/client/services').WeatherData & import('$lib/client/services').ErrorResponse}
 */
