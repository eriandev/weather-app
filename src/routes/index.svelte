<script>
  import { onMount, onDestroy } from 'svelte'
  import { useCurrentWeather, useDarkMode } from '@/hooks'
  import Header from '@/components/Header.svelte'
  import Picture from '@/components/Picture.svelte'
  import Loading from '@/components/Loading.svelte'
  import Temperature from '@/components/Temperature.svelte'

  /** @type {import('svelte/store').Unsubscriber} */
  let unsubscribe = () => {}

  const { activatesDarkMode } = useDarkMode()
  const { currentWeather, updateCurrentStore } = useCurrentWeather()

  onMount(() => {
    unsubscribe = currentWeather.subscribe(now => activatesDarkMode(now.isNight))
    updateCurrentStore()
  })
  onDestroy(() => unsubscribe())
</script>

{#if $currentWeather.loading || $currentWeather.failed}
  <Loading />
{:else}
  <Header title={$currentWeather.locationName} date={$currentWeather.locationDate} />
  <Picture animated name={$currentWeather.tempImage} class="mt-12 aspect-square" />
  <Temperature tempDegrees={$currentWeather.tempDegrees} tempCondition={$currentWeather.tempCondition} />
{/if}
