import { writable } from 'svelte/store'
import { getCurrentWeather } from '@/services'
import { DEFAULT_CURRENT_STORE } from '@/shared/constants'

/**
 * Hook for the use of the current weather
 * @type {import('@/hooks').UseWeather<import('@/shared/constants').CurrentWeatherStore>}
*/
export function useCurrentWeather() {
  const { set, update, subscribe } = writable(DEFAULT_CURRENT_STORE)

  /**
   * @type {import('@/hooks').UpdateStore}
   * @see https://www.weatherapi.com/docs/#intro-request
  */
  const updateStore = async (query) => {
    update(store => ({ ...store, loading: true }))

    try {
      const { ok, data, error } = await getCurrentWeather(query)

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
      set({
        failed: false,
        loading: false,
        tempDegress: current.temp_c,
        locationName: location.name,
        locationDate: location.localtime,
        tempCondition: current.condition.text,
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
  return [{subscribe}, updateStore]
}
