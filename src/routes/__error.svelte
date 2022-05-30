<script context="module">
  /** @type {import('@sveltejs/kit').Load} */
  export function load({ error, status }) {
    return {
      props: { status, error }
    }
  }
</script>

<script>
  import { onMount, onDestroy } from 'svelte'

  /** @type {number | null} */
  export let status
  /** @type {Error | null} */
  export let error
  /** @type {HTMLElement | null} */
  let mainElement = null

  onMount(() => {
    mainElement = document.querySelector('main')
    if(mainElement) mainElement.style.backgroundImage = 'url(images/png/alone.png)'
  })
  onDestroy(() => {
    if(mainElement) mainElement.style.backgroundImage = ''
  })
</script>

<section class="error">
  <h1>{status}</h1>

  <p>{error?.message}</p>
</section>

<style global lang="postcss">
  main {
    @apply bg-cover bg-center;
  }
</style>