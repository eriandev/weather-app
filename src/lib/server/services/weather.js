import { API_REQUEST_OPTIONS, API_URL } from '$lib/server/consts'

/**
 * Service for consuming the RapidAPI API
 * @type {import('$lib/client/services').GetWeatherData}
 * @see https://rapidapi.com/weatherapi/api/weatherapi-com/
 */
export async function getWeatherData ({ endpoint, query }) {
  const response = await fetch(`${API_URL}/${endpoint}.json?q=${query}`, API_REQUEST_OPTIONS)
  return await response.json()
}
