import { OWN_API_URL } from '$lib/client/consts'

/**
 * Service for consuming the our API of current weather
 * @type {import('$lib/client/services').GetWeather}
 */
export async function getCurrentWeather (query) {
  const queryParam = query ? `?q=${query}` : ''
  const response = await fetch(`${OWN_API_URL}/current${queryParam}`)
  return await response.json()
}

/**
 * Service for consuming the our API of forecast weather
 * @type {import('$lib/client/services').GetWeather}
 */
export async function getForecastWeather (query) {
  const queryParam = query ? `?q=${query}` : ''
  const response = await fetch(`${OWN_API_URL}/forecast${queryParam}`)
  return await response.json()
}
