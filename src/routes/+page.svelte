<script>
  import { onMount, onDestroy } from 'svelte'

  import Header from '@/components/Header.svelte'
  import Picture from '@/components/Picture.svelte'
  import Loading from '@/components/Loading.svelte'
  import Temperature from '@/components/Temperature.svelte'

  import { useCurrentWeather, useDarkMode } from '@/hooks'
  import { currentWeather } from '@/hooks/useCurrentWeather'
  import { isLocationAllowed } from '@/hooks/useGeolocation'
  import { openModal, closeModal } from '@/components/LocationModal.svelte'

  const { activatesDarkMode } = useDarkMode()
  const { updateCurrentStore, tryUpdateWithCoords } = useCurrentWeather()

  const unsubscribe = currentWeather.subscribe((info) => mainProcess(info))

  onMount(() => tryWithCoordsOr(updateCurrentStore))
  onDestroy(() => unsubscribe())

  /**
   * @param {import('@/shared/constants').CurrentWeatherStore} weatherInfo
   */
  async function mainProcess(weatherInfo) {
    const isWeatherInfoFailed = weatherInfo.failed && !weatherInfo.loading
    if (isWeatherInfoFailed) tryWithCoordsOr(openModal)
    else closeModal()
    activatesDarkMode(weatherInfo.isNight)
  }

  /**
   * @param {(param?: string) => Promise<void> | void} elseFunction
   */
  async function tryWithCoordsOr(elseFunction) {
    if (await isLocationAllowed()) tryUpdateWithCoords()
    else await elseFunction()
  }
</script>

{#if $currentWeather.loading || $currentWeather.failed}
  <Loading />
{:else}
  <Header title={$currentWeather.locationName} date={$currentWeather.locationDate} />
  <Picture shiny animated name={$currentWeather.tempImage} class="mx-auto mt-12 aspect-square w-[324px]" />
  <Temperature tempDegrees={$currentWeather.tempDegrees} tempCondition={$currentWeather.tempCondition} />
{/if}
