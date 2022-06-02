<script context="module">
  import { writable } from 'svelte/store'
  import { fade, fly } from 'svelte/transition'
  import { useCurrentWeather } from '@/hooks'

  const { set, subscribe } = writable(false)

  export const isOpen = {subscribe}
  export const openModal = () => set(true)
  export const closeModal = () => set(false)
</script>

<script>
  let loading = false
  const { tryUpdateWithCoords } = useCurrentWeather()

  async function requestLocation() {
    if(loading) return
    loading = !loading

    await tryUpdateWithCoords()
    loading = false
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
