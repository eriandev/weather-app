import { BASE_URL } from '@/shared/consts'
import { response } from '@/shared/utils.server'
import { getForecastWeather } from '@/services/weather.server'
import { getConditionByCode, getFormattedDateByUnixTime } from '@/shared/utils'
import type { RequestHandler } from './$types'

/**
 * @see https://svelte.dev/docs/kit/routing#server
 */
export const GET: RequestHandler = async ({ getClientAddress, url }) => {
  const query = url.searchParams.get('q') ?? getClientAddress()
  const isNotFromAppItself = BASE_URL !== url.origin

  if (isNotFromAppItself) return response(null, 418)

  try {
    const { current: c, error, forecast, location: l } = await getForecastWeather(query)

    if (error) return response({ error }, 400)

    const current = {
      isDay: Boolean(c.is_day),
      condition: {
        text: c.condition.text,
        time: getConditionByCode(c.condition.code),
      },
      temp: {
        c: c.temp_c,
        f: c.temp_f,
      },
    }

    const location = {
      name: l.name,
      country: l.country,
      locationDate: getFormattedDateByUnixTime(l.localtime_epoch),
    }

    return response({ current, location, forecast: forecast.forecastday }, 200)
  } catch (error) {
    console.warn(error)
    return response({ error: { message: 'Request failed' } }, 410)
  }
}
