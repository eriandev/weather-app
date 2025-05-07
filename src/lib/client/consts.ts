import { env } from '$env/dynamic/public'
import type { CurrentWeatherStore } from '$lib/client/types'

export const BASE_URL = env.PUBLIC_BASE_URL ?? ''
export const OWN_API_URL = `${BASE_URL}/api` as const
export const MONTHS_LIST = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
] as const

export const DEFAULT_CURRENT_STORE: CurrentWeatherStore = {
  isDay: false,
  tempText: '',
  failed: false,
  loading: true,
  tempImage: '',
  tempDegrees: 0,
  locationName: '',
  tempCondition: '',
  locationCountry: '',
  locationDate: undefined
}
