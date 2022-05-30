<script>
  import { onMount, onDestroy } from 'svelte'
  import { useCurrentWeather, useDarkMode } from '@/hooks'
  import Header from '@/components/Header.svelte'
  import Picture from '@/components/Picture.svelte'
  import Loading from '@/components/Loading.svelte'
  import Temperature from '@/components/Temperature.svelte'

  /** @type {import('svelte/store').Unsubscriber} */
  let unsubscribe = () => {}

  const [weather, update] = useCurrentWeather()
  const { activatesDarkMode } = useDarkMode()

  onMount(() => {
    unsubscribe = weather.subscribe(now => activatesDarkMode(now.isNight))
    update()
  })
  onDestroy(() => unsubscribe())
</script>

{#if $weather.loading}
  <Loading />
{:else}
  <Header title={$weather.locationName} date={$weather.locationDate} />
  <Picture animated name={$weather.tempImage} class="mt-12 aspect-square" />
  <Temperature tempDegrees={$weather.tempDegrees} tempCondition={$weather.tempCondition} />
{/if}
