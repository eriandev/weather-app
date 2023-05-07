<script>
  import { BASE_URL } from '$lib/client/consts'

  /** @type {string} */
  export let name
  /** @type {boolean} */
  export let shiny = false
  /** @type {boolean} */
  export let animated = false
  /** @type {string} */
  let customClass = ''
  export { customClass as class }
</script>

{#if name}
  <picture class={shiny ? 'drop-shadow-sun filter dark:drop-shadow-moon' : null}>
    <source type="image/webp" srcset="{BASE_URL}/images/webp/{name}.webp" />
    <source type="image/png" srcset="{BASE_URL}/images/png/{name}.png" />
    <img
      alt={name}
      src="{BASE_URL}/images/png/{name}.png"
      class={animated ? `animate-float ${customClass}` : customClass}
      {...$$restProps}
      on:click
    />
  </picture>
{/if}
