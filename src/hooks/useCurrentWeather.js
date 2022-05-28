import { writable } from 'svelte/store'

/** @type {CurrentWeatherStore} */
const DEFAULT_CURRENT_STORE = {
  failed: false,
  loading: true,
  tempDegress: 0,
  locationDate: '',
  locationName: '',
  tempCondition: '',
}

/**
 * Hook for the use of the current weather
 * @type {import('@/hooks').UseWeather<CurrentWeatherStore>}
*/
export function useCurrentWeather() {
  const { set, update, subscribe } = writable(DEFAULT_CURRENT_STORE)

  /**
   * @type {import('@/hooks').UpdateStore}
   * @see https://www.weatherapi.com/docs/#intro-request
  */
  const updateStore = async (query) => {
    const queryParam = query ? `?q=${query}` : ''
    update(store => ({ ...store, loading: true }))

    try {
      const response = await fetch(`/api/weather/current${queryParam}`)
      /** @type {import('@/hooks').GetWeatherResponse} */
      const { ok, data, error } = await response.json()

      if(!ok) {
        update(store => ({
          ...store,
          failed: true,
          loading: false,
          errorCode: error?.code,
          errorMessage: error?.message,
        }))
        return
      }

      const { current, location } = data
      const locationName = location.name
      const tempDegress = current.temp_c
      const locationDate = location.localtime
      const tempCondition = current.condition.text

      set({
        tempDegress,
        locationDate,
        locationName,
        tempCondition,
        failed: false,
        loading: false,
      })

    } catch (error) {
      console.error(error)
      update(store => ({
        ...store,
        failed: true,
        loading: false,
        errorCode: undefined,
        errorMessage: undefined,
      }))
    }
  }

  // @ts-ignore
  return [updateStore, {subscribe}]
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
 * | HTTP Status Code 	| Error code 	| Description                                 	|
 * |------------------	|------------	|---------------------------------------------	|
 * | 401              	| 1002       	| API key not provided.                       	|
 * | 400              	| 1003       	| Parameter 'q' not provided.                 	|
 * | 400              	| 1005       	| API request url is invalid                  	|
 * | 400              	| 1006       	| No location found matching parameter 'q'    	|
 * | 401              	| 2006       	| API key provided is invalid                 	|
 * | 403              	| 2007       	| API key has exceeded calls per month quota. 	|
 * | 403              	| 2008       	| API key has been disabled.                  	|
 * | 400              	| 9999       	| Internal application error.                 	|
*/
