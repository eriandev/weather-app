<script>
  import { onMount, onDestroy } from 'svelte'
  import { useCurrentWeather, useDarkMode } from '@/hooks'
  import { currentWeather } from '@/hooks/useCurrentWeather'
  import { isLocationAllowed } from '@/hooks/useGeolocation'
  import { openModal, closeModal } from '@/components/LocationModal.svelte'
  import Header from '@/components/Header.svelte'
  import Picture from '@/components/Picture.svelte'
  import Loading from '@/components/Loading.svelte'
  import Temperature from '@/components/Temperature.svelte'

  const { activatesDarkMode } = useDarkMode()
  const { updateCurrentStore, tryUpdateWithCoords } = useCurrentWeather()

  const unsubscribe = currentWeather.subscribe(info => mainProcess(info))

  onMount(async () => {
    if (await isLocationAllowed())
      tryUpdateWithCoords()
    else await updateCurrentStore()
  })
  onDestroy(() => unsubscribe())

  /**
   * @param {import('@/shared/constants').CurrentWeatherStore} weatherInfo
  */
  async function mainProcess(weatherInfo) {
    if(weatherInfo.failed && !weatherInfo.loading) {
      if (await isLocationAllowed()) {
        tryUpdateWithCoords()
      } else openModal()
    } else closeModal()
    activatesDarkMode(weatherInfo.isNight)
  }
</script>

{#if $currentWeather.loading || $currentWeather.failed}
  <Loading />
{:else}
  <Header title={$currentWeather.locationName} date={$currentWeather.locationDate} />
  <Picture animated name={$currentWeather.tempImage} class="w-[324px] mt-12 mx-auto aspect-square" />
  <Temperature tempDegrees={$currentWeather.tempDegrees} tempCondition={$currentWeather.tempCondition} />
{/if}
