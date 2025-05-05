import { OWN_API_URL } from '$lib/client/consts'
import type { GetCurrentWeather, GetForecastWeather } from '$lib/client/services/types'

/**
 * Service for consuming the our API of current weather
 */
export const getCurrentWeather: GetCurrentWeather = async (query) => {
  const queryParam = query ? `?q=${query}` : ''
  const response = await fetch(`${OWN_API_URL}/current${queryParam}`)
  return response.json()
}

/**
 * Service for consuming the our API of forecast weather
 */
export const getForecastWeather: GetForecastWeather = async (query) => {
  const queryParam = query ? `?q=${query}` : ''
  const response = await fetch(`${OWN_API_URL}/forecast${queryParam}`)
  return response.json()
}
