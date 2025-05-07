import { writable } from 'svelte/store'
import { getCurrentWeather } from '@/services/weather'
import { DEFAULT_CURRENT_STORE } from '@/shared/consts'
import { useGeolocation } from '$lib/hooks/useGeolocation'
import type { UpdateStore, UseCurrentWeather } from '$lib/hooks/types'

const { set, update, subscribe } = writable(DEFAULT_CURRENT_STORE)
export const currentWeather = { subscribe }

export const useCurrentWeather: UseCurrentWeather = () => {
  const { getCurrentPosition } = useGeolocation({})

  /**
   * @see https://www.weatherapi.com/docs/#intro-request
   */
  const updateCurrentStore: UpdateStore = async (query) => {
    update((store) => ({ ...store, loading: true }))

    try {
      const { ok, current, location, error } = await getCurrentWeather(query)

      if (!ok) {
        update((store) => ({
          ...store,
          failed: true,
          loading: false,
          errorMessage: error?.message
        }))
        return
      }

      set({
        failed: false,
        loading: false,
        isDay: current.isDay,
        locationName: location.name,
        tempText: current.condition.text,
        locationCountry: location.country,
        locationDate: location.locationDate,
        tempCondition: current.condition.time,
        tempDegrees: Math.floor(current.temp.c),
        tempImage: `${current.isDay ? 'day' : 'night'}-${current.condition.time}`
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
