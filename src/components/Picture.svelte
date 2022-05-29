<script>
  import { BASE_URL } from '@/shared/constants'

  /** @type {string} */
  export let name
  /** @type {boolean} */
  export let animated = false
</script>

{#if name}
  <picture class="image">
    <source srcset="{BASE_URL}images/webp/{name}.webp" type="image/webp" />
    <source srcset="{BASE_URL}images/png/{name}.png" type="image/png" /> 
    <img class:animated src="{BASE_URL}images/png/{name}.png" alt={name} {...$$restProps} on:click />
  </picture>
{/if}
