import { API_REQUEST_OPTIONS, API_URL } from '@/lib/server/consts'
import type { CurrentResponse, ErrorResponse, ForecastResponse } from '@/routes/api/types'

export async function getCurrentWeather(query?: string): Promise<CurrentResponse & ErrorResponse> {
  const urlRequest = new URL(`${API_URL}/current.json`)
  if (query) urlRequest.searchParams.set('q', query)
  const apiResponse = await fetch(urlRequest, API_REQUEST_OPTIONS)
  return await apiResponse.json()
}

export async function getForecastWeather(query?: string): Promise<ForecastResponse & ErrorResponse> {
  const urlRequest = new URL(`${API_URL}/forecast.json`)
  if (query) urlRequest.searchParams.set('q', query)
  const apiResponse = await fetch(urlRequest, API_REQUEST_OPTIONS)
  return await apiResponse.json()
}
