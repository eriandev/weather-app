const { VITE_RAPIAPI_HOST, VITE_RAPIAPI_KEY, VITE_BASE_URL } = import.meta.env

export const RAPIAPI_HOST = VITE_RAPIAPI_HOST
export const RAPIAPI_KEY = VITE_RAPIAPI_KEY
export const RAPIAPI_URL = `https://${RAPIAPI_HOST}`

export const RAPIAPI_REQUEST_OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': RAPIAPI_HOST,
    'X-RapidAPI-Key': RAPIAPI_KEY
  }
}

export const BASE_URL = VITE_BASE_URL
export const OWN_API_URL = `${BASE_URL}api/weather/`
export const AVAIBLE_ENDPOINTS = ['current', 'forecast']
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
  isNight: true,
  failed: false,
  loading: true,
  tempDegrees: 0,
  locationName: '',
  tempCondition: '',
  tempImage: '',
  tempText: ''
}

/**
 * @typedef {object} CurrentWeatherStore
 * @prop {boolean} isNight — Night status
 * @prop {boolean} failed — Failed status
 * @prop {boolean} loading — Loading status
 * @prop {string} locationName — Location name
 * @prop {string} tempText — Weather condition text
 * @prop {string=} locationDate — Local date and time
 * @prop {number} tempDegrees — Temperature in celsius
 * @prop {string} tempImage — Weather condition image name
 * @prop {string} tempCondition — Weather condition image name
 * @prop {string=} errorMessage — Error description
 */
