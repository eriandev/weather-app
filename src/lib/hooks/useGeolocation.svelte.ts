import { browser } from '$app/environment'
import { usePermissions } from '$lib/hooks/usePermissions.svelte'

let isModalOpen = $state(false)

export function useGeolocation({ enableHighAccuracy = true, maximumAge = 30000, timeout = 3000 } = {}) {
  const permissions = usePermissions()

  const openModal = () => (isModalOpen = true)
  const closeModal = () => (isModalOpen = false)

  const getPosition = async (): Promise<GeolocationPosition> => {
    const isAvailable = browser && navigator && 'geolocation' in navigator

    if (!isAvailable) {
      throw new Error('Geolocation is not found')
    }

    const { state } = await permissions.query({ name: 'geolocation' })

    if (state === 'denied') {
      throw new Error('Geolocation is denied')
    }

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy, maximumAge, timeout })
    })
  }

  const getPermissionStatus = async () => {
    return await navigator.permissions.query({ name: 'geolocation' })
  }

  return {
    get isModalOpen() {
      return isModalOpen
    },
    closeModal,
    getPermissionStatus,
    getPosition,
    openModal
  }
}
