import { writable } from 'svelte/store'
import { getCurrentWeather } from '@/services/weather'
import { DEFAULT_CURRENT_STORE } from '@/shared/consts'
import { useDarkMode } from '@/lib/hooks/useDarkMode.svelte'
import { useGeolocation } from '$lib/hooks/useGeolocation.svelte'

const { set, update, subscribe } = writable(DEFAULT_CURRENT_STORE)
const currentWeather = { subscribe }

export function useCurrentWeather() {
  const darkMode = useDarkMode()
  const geolocation = useGeolocation()

  /**
   * @see https://www.weatherapi.com/docs/#intro-request
   */
  const updateCurrentStore = async (query?: string) => {
    update((store) => ({ ...store, loading: true }))

    try {
      const { ok, current, location, error } = await getCurrentWeather(query)

      if (!ok) {
        updateCurrentError(error?.message)
        return
      }

      darkMode.toggle(!current.isDay)

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
    } catch {
      updateCurrentError()
    }
  }

  const tryUpdateWithCoords = async () => {
    try {
      const { coords } = await geolocation.getPosition()
      const position = `${coords.latitude},${coords.longitude}`
      await updateCurrentStore(position)
    } catch (error) {
      console.warn(error)
      await updateCurrentStore()
    } finally {
      geolocation.closeModal()
    }
  }

  const updateCurrentError = (errorMessage?: string) => {
    darkMode.toggle(true)
    console.warn(errorMessage)
    update((store) => ({
      ...store,
      failed: true,
      errorMessage,
      loading: false,
    }))
  }

  return {
    currentWeather,
    updateCurrentStore,
    tryUpdateWithCoords
  }
}
