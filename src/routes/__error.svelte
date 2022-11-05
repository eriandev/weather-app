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
    if(mainElement) {
      mainElement.style.backgroundImage = 'url(images/png/alone.png)'
      mainElement.style.backgroundPosition = 'center'
      mainElement.style.backgroundSize = 'cover'
    }
  })
  onDestroy(() => {
    if(mainElement) {
      mainElement.style.backgroundImage = ''
      mainElement.style.backgroundPosition = ''
      mainElement.style.backgroundSize = ''
    }
  })
</script>

<section class="grid h-full grid-flow-row auto-rows-min content-center text-center dark:text-white">
  <h1 class="text-8xl font-bold dark:text-white">{status}</h1>
  <p>{error?.message}</p>
</section>
