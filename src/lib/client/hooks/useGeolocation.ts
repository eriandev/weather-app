import { browser } from '$app/environment'

let isAvailable = false
if (browser) isAvailable = window?.navigator && 'geolocation' in window.navigator

export function useGeolocation({ enableHighAccuracy = true, maximumAge = 30000, timeout = 3000 }) {
  const getCurrentPosition = async (): Promise<GeolocationPosition> => {
    if (!isAvailable) {
      return Promise.reject({
        code: 404,
        message: 'Geolocation is not available'
      })
    }

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy, maximumAge, timeout })
    })
  }

  return { getCurrentPosition }
}

export const isLocationAllowed = async () => {
  try {
    if (!browser) return false
    const { state } = await window.navigator.permissions.query({ name: 'geolocation' })
    return state === 'granted'
  } catch (error) {
    console.error(error)
    return false
  }
}
