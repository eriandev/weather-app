import { BASE_URL } from '$lib/client/consts'
import { API_REQUEST_OPTIONS, API_URL } from '$lib/server/consts'
import { getConditionByCode, getFormattedDateByUnixTime, response } from '$lib/server/utils'
import type { ErrorResponse, ForecastResponse } from '@/routes/api/types'
import type { RequestHandler } from './$types'

/**
 * @see https://svelte.dev/docs/kit/routing#server
 */
export const GET: RequestHandler = async ({ fetch, getClientAddress, url }) => {
  const query = url.searchParams.get('q') ?? getClientAddress()

  const isNotFromAppItself = !(BASE_URL === url.origin)

  if (isNotFromAppItself) {
    return response(null, 418)
  }

  try {
    const GET_WEATHER_DATA_URL = `${API_URL}/forecast.json?q=${query}`
    const apiResponse = await fetch(GET_WEATHER_DATA_URL, API_REQUEST_OPTIONS)
    const { current: cur, location: loc, forecast, error }: ForecastResponse & ErrorResponse = await apiResponse.json()

    if (error) return response({ error }, 400)

    const current = {
      isDay: Boolean(cur.is_day),
      condition: {
        text: cur.condition.text,
        time: getConditionByCode(cur.condition.code)
      },
      temp: {
        c: 12.0,
        f: 53.6
      }
    }

    const location = {
      name: loc.name,
      country: loc.country,
      locationDate: getFormattedDateByUnixTime(loc.localtime_epoch)
    }

    return response({ current, location, forecast: forecast.forecastday }, 200)
  } catch (error) {
    console.warn(error)
    return response({ error: { message: 'Request failed' } }, 410)
  }
}
