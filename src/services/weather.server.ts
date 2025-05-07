import { API_REQUEST_OPTIONS, API_URL } from '@/shared/consts.server'
import type { CurrentResponse, ErrorResponse, ForecastResponse } from '@/services/types'

export async function getCurrentWeather(query?: string): Promise<CurrentResponse & ErrorResponse> {
  const urlRequest = new URL(`${API_URL}/current.json`)
  if (query) urlRequest.searchParams.set('q', query)

  const response = await fetch(urlRequest, API_REQUEST_OPTIONS)
  return await response.json()
}

export async function getForecastWeather(query?: string): Promise<ForecastResponse & ErrorResponse> {
  const urlRequest = new URL(`${API_URL}/forecast.json`)
  if (query) urlRequest.searchParams.set('q', query)

  const response = await fetch(urlRequest, API_REQUEST_OPTIONS)
  return await response.json()
}
