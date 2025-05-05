<script module lang="ts">
  import { writable } from 'svelte/store'
  import { fade, fly } from 'svelte/transition'
  import { useCurrentWeather } from '@/lib/client/hooks'

  const { set, subscribe } = writable(false)

  export const isOpen = { subscribe }
  export const openModal = () => set(true)
  export const closeModal = () => set(false)
</script>

<script>
  let loading = false
  const { tryUpdateWithCoords } = useCurrentWeather()

  async function requestLocation() {
    if (loading) return

    loading = !loading
    await tryUpdateWithCoords()
    loading = false
  }
</script>

{#if $isOpen}
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
        {!loading ? `I'm here 🗺️` : `Seeking you... 🛰️`}
      </button>
    </article>
  </div>
{/if}
