import { env } from '$env/dynamic/public'

export const BASE_URL = env.PUBLIC_BASE_URL ?? ''
export const OWN_API_URL = `${BASE_URL}/api`
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
]

/** @type {CurrentWeatherStore} */
export const DEFAULT_CURRENT_STORE = {
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

/**
 * @typedef {object} CurrentWeatherStore
 * @prop {boolean} isDay Day status
 * @prop {boolean} failed Failed status
 * @prop {boolean} loading Loading status
 * @prop {string} locationName Location name
 * @prop {string} tempText Weather condition text
 * @prop {string} locationCountry Location country
 * @prop {number} tempDegrees Temperature in celsius
 * @prop {string} tempImage Weather condition image name
 * @prop {string} tempCondition Weather condition image name
 * @prop {string|undefined} locationDate Local date and time
 * @prop {string=} errorMessage Error description
 */
