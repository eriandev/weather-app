import { writable } from 'svelte/store'
import { getCurrentWeather } from '@/services'
import { getConditionByCode } from '@/shared/functions'
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
      const isDay = !!current.is_day
      const condition = getConditionByCode(current.condition.code)

      set({
        isDay,
        failed: false,
        loading: false,
        tempCondition: condition,
        locationName: location.name,
        locationDate: location.localtime,
        tempText: current.condition.text,
        tempDegrees: Math.floor(current.temp_c),
        tempImage: `${isDay ? 'day' : 'night'}-${condition}`,
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
