import { writable } from 'svelte/store'
import { getCurrentWeather } from '@/services'
import { DEFAULT_CURRENT_STORE } from '@/shared/constants'
import { getConditionByCode, getFormattedDateByUnixTime } from '@/shared/functions'

const { set, update, subscribe } = writable(DEFAULT_CURRENT_STORE)
export const currentWeather = { subscribe }

/**
 * Hook for the use of the current weather
 * @type {import('@/hooks').UseCurrentWeather<import('@/shared/constants').CurrentWeatherStore>}
*/
export default function useCurrentWeather() {
  /**
   * @type {import('@/hooks').UpdateStore}
   * @see https://www.weatherapi.com/docs/#intro-request
  */
  const updateCurrentStore = async (query) => {
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
      const isNight = !current.is_day
      const condition = getConditionByCode(current.condition.code)

      set({
        isNight,
        failed: false,
        loading: false,
        tempCondition: condition,
        locationName: location.name,
        tempText: current.condition.text,
        tempDegrees: Math.floor(current.temp_c),
        tempImage: `${isNight ? 'night' : 'day'}-${condition}`,
        locationDate: getFormattedDateByUnixTime(location.localtime_epoch),
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

  return { updateCurrentStore }
}
