<script lang="ts">
  import { fade, fly } from 'svelte/transition'

  import { useGeolocation } from '$lib/hooks/useGeolocation.svelte'
  import { useCurrentWeather } from '$lib/hooks/useCurrentWeather.svelte'

  let isLoading = $state(false)
  const geolocation = useGeolocation()
  const currentWeather = useCurrentWeather()

  interface GeolocationModalProps {
    actionLabel: string
    loadingLabel: string
  }

  const { actionLabel, loadingLabel }: GeolocationModalProps = $props()

  async function requestLocation() {
    if (isLoading) return

    isLoading = true
    await currentWeather.tryUpdateWithCoords()
    isLoading = false
  }
</script>

{#if geolocation.isModalOpen}
  <div
    transition:fade
    class="absolute top-0 left-0 z-50 grid h-full w-full place-items-center bg-[rgba(0,0,0,0.5)] px-12 md:rounded-4xl"
  >
    <article
      transition:fly={{ y: 120, duration: 500 }}
      class="grid w-full gap-4 rounded-4xl bg-white px-4 py-8 text-center"
    >
      <h2 class="text-4xl">I can't find you</h2>
      <p>I need you to give me a clue as to where you are</p>
      <button
        class="bg-snow mx-auto rounded-lg px-4 py-2 tracking-wide text-white transition-transform duration-100 ease-in-out outline-none active:scale-[0.98] active:transform"
        onclick={requestLocation}
      >
        {isLoading ? loadingLabel : actionLabel}
      </button>
    </article>
  </div>
{/if}
