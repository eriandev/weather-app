<script lang="ts">
  import { onMount, onDestroy } from 'svelte'

  import Header from '@/components/Header.svelte'
  import Picture from '@/components/Picture.svelte'
  import Loading from '@/components/Loading.svelte'
  import Temperature from '@/components/Temperature.svelte'

  import { debounce } from '@/shared/utils'
  import { useDarkMode } from '$lib/hooks/useDarkMode'
  import { currentWeather } from '$lib/hooks/useCurrentWeather'
  import { isLocationAllowed } from '$lib/hooks/useGeolocation'
  import { useCurrentWeather } from '$lib/hooks/useCurrentWeather'
  import { openModal, closeModal } from '@/components/LocationModal.svelte'
  import type { CurrentWeatherStore } from '@/shared/types'

  const { activatesDarkMode } = useDarkMode()
  const { updateCurrentStore, tryUpdateWithCoords } = useCurrentWeather()

  const unsubscribe = currentWeather.subscribe((info) => debounce(() => mainProcess(info), 2000))

  onMount(() => tryWithCoordsOr(updateCurrentStore))
  onDestroy(() => unsubscribe())

  async function mainProcess(weatherInfo: CurrentWeatherStore) {
    const isWeatherInfoFailed = weatherInfo.failed && !weatherInfo.loading
    if (isWeatherInfoFailed) tryWithCoordsOr(openModal)
    else closeModal()
    activatesDarkMode(!weatherInfo.isDay)
  }

  async function tryWithCoordsOr(elseFunction: (param?: string) => Promise<void> | void) {
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
