<script>
  import { BASE_URL } from '@/shared/constants'

  /** @type {string} */
  export let name
  /** @type {boolean} */
  export let animated = false
</script>

{#if name}
  <picture class="drop-shadow-[0_25px_25px_rgb(251,198,43,0.3)] filter dark:drop-shadow-[0_25px_25px_rgb(255,255,255,0.2)]">
    <source type="image/webp" srcset="{BASE_URL}images/webp/{name}.webp" />
    <source type="image/png" srcset="{BASE_URL}images/png/{name}.png" /> 
    <img class={animated ? 'animate-float': ''} src="{BASE_URL}images/png/{name}.png" alt={name} {...$$restProps} on:click />
  </picture>
{/if}
