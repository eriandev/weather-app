import { getWeatherData } from '@/services'
import { AVAIBLE_ENDPOINTS } from '@/shared/constants'

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 * @see https://kit.svelte.dev/docs/routing#endpoints
*/
export async function GET(event) {
  const { clientAddress, params, url: { searchParams } } = event
  const query = searchParams.get('q') ?? clientAddress
  const { endpoint } = params

  if(!AVAIBLE_ENDPOINTS.includes(endpoint)) {
    return {
      status: 400,
      body: {
        ok: false,
        /** @see https://www.weatherapi.com/docs/#intro-error-codes */
        error: {
          code: 1005,
          message: 'API request url is invalid',
        }
      }
    }
  }

  try {
    const data = await getWeatherData({ endpoint, query })

    if(data?.error) {
      return {
        status: 400,
        body: {
          ok: false,
          error: data.error
        }
      }
    }

    return {
      status: 200,
      body: {
        ok: true,
        data
      }
    }
  } catch (error) {
    return {
      status: 400,
      body: {
        ok: false,
        error: {
          code: 0,
          message: 'Request failed',
        }
      }
    }
  }
}
