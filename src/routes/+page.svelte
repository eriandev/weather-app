<script lang="ts">
  import { onMount } from 'svelte'

  import Header from '@/components/Header.svelte'
  import Picture from '@/components/Picture.svelte'
  import Loading from '@/components/Loading.svelte'
  import Temperature from '@/components/Temperature.svelte'
  import { useGeolocation } from '$lib/hooks/useGeolocation.svelte'
  import { useCurrentWeather } from '$lib/hooks/useCurrentWeather.svelte'

  const geolocation = useGeolocation()
  const { currentWeather, tryUpdateWithCoords, updateCurrentStore } = useCurrentWeather()

  onMount(async () => {
    const { state } = await geolocation.getPermissionStatus()

    if (state === 'denied') {
      await updateCurrentStore()
      return
    }

    if (state === 'prompt') {
      geolocation.openModal()
      return
    }

    await tryUpdateWithCoords()
  })
</script>

{#if $currentWeather.loading || $currentWeather.failed}
  <Loading />
{:else}
  <main>
    <Header title={$currentWeather.locationName} date={$currentWeather.locationDate} />
    <Picture shiny animated name={$currentWeather.tempImage} class="mx-auto mt-12 aspect-square w-[324px]" />
    <Temperature tempDegrees={$currentWeather.tempDegrees} tempCondition={$currentWeather.tempCondition} />
  </main>
{/if}
