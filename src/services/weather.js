import { OWN_API_URL, RAPIAPI_REQUEST_OPTIONS, RAPIAPI_URL } from '@/shared/constants'

/**
 * Service for consuming the RapidAPI API
 * @type {import('@/services').GetWeatherData}
 * @see https://rapidapi.com/weatherapi/api/weatherapi-com/
*/
export async function getWeatherData({ endpoint, query }) {
  const response = await fetch(`${RAPIAPI_URL}/${endpoint}.json?q=${query}`, RAPIAPI_REQUEST_OPTIONS)
  return await response.json()
}

/**
 * Service for consuming the our API of current weather
 * @type {import('@/services').GetWeather}
*/
export async function getCurrentWeather(query) {
  const queryParam = query ? `?q=${query}` : ''
  const response = await fetch(`${OWN_API_URL}current${queryParam}`)
  return await response.json()
}

/**
 * Service for consuming the our API of forecast weather
 * @type {import('@/services').GetWeather}
*/
export async function getForecastWeather(query) {
  const queryParam = query ? `?q=${query}` : ''
  const response = await fetch(`${OWN_API_URL}forecast${queryParam}`)
  return await response.json()
}
