import { writable } from 'svelte/store'
import { useGeolocation } from '$lib/client/hooks'
import { getCurrentWeather } from '$lib/client/services'
import { DEFAULT_CURRENT_STORE } from '$lib/client/consts'
import { getConditionByCode, getFormattedDateByUnixTime } from '$lib/client/utils'

const { set, update, subscribe } = writable(DEFAULT_CURRENT_STORE)
export const currentWeather = { subscribe }

/**
 * Hook for the use of the current weather
 * @type {import('$lib/client/hooks').UseCurrentWeather<import('$lib/client/consts').CurrentWeatherStore>}
 */
export default function useCurrentWeather () {
  const { getCurrentPosition } = useGeolocation({})

  /**
   * @type {import('$lib/client/hooks').UpdateStore}
   * @see https://www.weatherapi.com/docs/#intro-request
   */
  const updateCurrentStore = async (query) => {
    update((store) => ({ ...store, loading: true }))

    try {
      const { ok, data, error } = await getCurrentWeather(query)

      if (!ok) {
        update((store) => ({
          ...store,
          failed: true,
          loading: false,
          errorMessage: error?.message
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
        locationDate: getFormattedDateByUnixTime(location.localtime_epoch)
      })
    } catch (error) {
      console.error(error)
      update((store) => ({
        ...store,
        failed: true,
        loading: false,
        errorMessage: undefined
      }))
    }
  }

  const tryUpdateWithCoords = async () => {
    try {
      const { coords } = await getCurrentPosition()
      const position = `${coords.latitude},${coords.longitude}`
      await updateCurrentStore(position)
    } catch (error) {
      console.error(error)
    }
  }

  return { updateCurrentStore, tryUpdateWithCoords }
}
