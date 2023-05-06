import { json } from '@sveltejs/kit'
import { getWeatherData } from '@/services'
import { AVAIBLE_ENDPOINTS, BASE_URL } from '@/shared/constants'

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
    return json({
      status: 418,
      body: {
        ok: false,
        error: { message: `I'm a teapot` }
      }
    })
  }

  if (isNotAvailableEndpoint) {
    return json({
      status: 400,
      body: {
        ok: false,
        /** @see https://www.weatherapi.com/docs/#intro-error-codes */
        error: {
          code: 1005,
          message: 'API request url is invalid'
        }
      }
    })
  }

  try {
    const data = await getWeatherData({ endpoint, query })

    if (data?.error) {
      return json({
        status: 400,
        body: {
          ok: false,
          error: data.error
        }
      })
    }

    return json({
      status: 200,
      body: {
        ok: true,
        data
      }
    })
  } catch (error) {
    return json({
      status: 400,
      body: {
        ok: false,
        error: {
          code: 0,
          message: 'Request failed'
        }
      }
    })
  }
}
