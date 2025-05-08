<script lang="ts">
  import { onMount } from 'svelte'

  import Image from '@/components/Image.svelte'
  import Header from '@/components/Header.svelte'
  import Loading from '@/components/Loading.svelte'
  import Temperature from '@/components/Temperature.svelte'
  import { useGeolocation } from '$lib/hooks/useGeolocation.svelte'
  import { useCurrentWeather } from '$lib/hooks/useCurrentWeather.svelte'

  const geolocation = useGeolocation()
  const { currentWeather, tryUpdateWithCoords, updateCurrentStore } = useCurrentWeather()

  onMount(async () => {
    const { state } = await geolocation.getPermissionStatus()

    if (state === 'denied') return await updateCurrentStore()
    if (state === 'prompt') return geolocation.openModal()

    await tryUpdateWithCoords()
  })
</script>

{#if $currentWeather.loading || $currentWeather.failed}
  <Loading />
{:else}
  <main>
    <Header title={$currentWeather.locationName} date={$currentWeather.locationDate} />
    <Image
      shiny
      animated
      width="320"
      height="320"
      alt={$currentWeather.tempImage}
      name={$currentWeather.tempImage}
      class="mx-auto mt-12 aspect-square w-80"
    />
    <Temperature tempDegrees={$currentWeather.tempDegrees} tempCondition={$currentWeather.tempCondition} />
  </main>
{/if}
