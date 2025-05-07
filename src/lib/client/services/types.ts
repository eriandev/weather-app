import type { GetCurrentData, GetForecastData } from '@/routes/api/types'

export type GetCurrentWeather = (query?: string) => Promise<GetCurrentData>
export type GetForecastWeather = (query?: string) => Promise<GetForecastData>
