<script context="module">
  import { writable } from 'svelte/store'
  import { fade, fly } from 'svelte/transition'

  const { set, subscribe } = writable(false)

  export const isOpen = {subscribe}
  export const openModal = () => set(true)
  export const closeModal = () => set(false)
</script>

<script>
  import { useGeolocation, useCurrentWeather } from '@/hooks'

  let loading = false

  const { getCurrentPosition } = useGeolocation({})
  const { updateCurrentStore } = useCurrentWeather()

  async function requestLocation() {
    if(loading) return
    loading = !loading

    try {
      const { coords } = await getCurrentPosition()
      const position = `${coords.latitude},${coords.longitude}`
      await updateCurrentStore(position)
    } catch (error) {
      console.error(error)
    } finally {
      loading = false
    }
  }
</script>

{#if $isOpen}
  <div class="overlay" transition:fade>
    <article class="modal" transition:fly="{{ y: 120, duration: 500 }}">
      <h2>I can't find you</h2>
      <p>I need you to give me a clue as to where you are</p>
      <button class="btn" on:click={requestLocation}>
        {!loading ? `I'm here 🗺️` : `Seeking you... 🛰️`}
      </button>
    </article>
  </div>
{/if}
