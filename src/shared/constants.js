export const RAPIAPI_HOST = import.meta.env.VITE_RAPIAPI_HOST
export const RAPIAPI_KEY = import.meta.env.VITE_RAPIAPI_KEY
export const RAPIAPI_URL = `https://${RAPIAPI_HOST}`

export const RAPIAPI_REQUEST_OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': RAPIAPI_HOST,
    'X-RapidAPI-Key': RAPIAPI_KEY
  }
}



export const OWN_API_URL = '/api/weather/'
export const AVAIBLE_ENDPOINTS = ['current', 'forecast']

/** @type {CurrentWeatherStore} */
export const DEFAULT_CURRENT_STORE = {
  failed: false,
  loading: true,
  tempDegress: 0,
  locationDate: '',
  locationName: '',
  tempCondition: '',
}

/**
 * @typedef {object} CurrentWeatherStore
 * @prop {string} locationName — Location name
 * @prop {string} locationDate — Local date and time
 * @prop {number} tempDegress — Temperature in celsius
 * @prop {string} tempCondition — Weather condition text
 * @prop {boolean} failed — Failed status
 * @prop {boolean} loading — Loading status
 * @prop {string=} errorMessage — Error description
 * @prop {number=} errorCode
 * | HTTP Status Code 	| Error code 	| Description                                 |
 * |------------------	|------------	|---------------------------------------------|
 * | 400              	| 0         	| Request failed                              |
 * | 401              	| 1002       	| API key not provided                        |
 * | 400              	| 1003       	| Parameter 'q' not provided                  |
 * | 400              	| 1005       	| API request url is invalid                  |
 * | 400              	| 1006       	| No location found matching parameter 'q'    |
 * | 401              	| 2006       	| API key provided is invalid                 |
 * | 403              	| 2007       	| API key has exceeded calls per month quota  |
 * | 403              	| 2008       	| API key has been disabled                   |
 * | 400              	| 9999       	| Internal application error                  |
*/
