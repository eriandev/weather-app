import { OWN_API_URL } from '@/shared/consts'
import type { GetCurrentData, GetForecastData } from '@/services/types'

export async function getCurrentWeather(query?: string): Promise<GetCurrentData> {
  const urlRequest = new URL(`${OWN_API_URL}/current`)
  if (query) urlRequest.searchParams.set('q', query)

  const response = await fetch(urlRequest)
  return await response.json()
}

export async function getForecastWeather(query?: string): Promise<GetForecastData> {
  const urlRequest = new URL(`${OWN_API_URL}/forecast`)
  if (query) urlRequest.searchParams.set('q', query)

  const response = await fetch(urlRequest)
  return await response.json()
}
