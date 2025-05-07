<script lang="ts">
  import { BASE_URL } from '@/shared/consts'
  import type { HTMLImgAttributes } from 'svelte/elements'

  interface PictureProps extends HTMLImgAttributes {
    name: string
    shiny?: boolean
    animated?: boolean
  }

  const { name, animated = false, shiny = false, class: extraClass, ...restProps }: PictureProps = $props()
</script>

{#if name}
  <picture class={{ 'drop-shadow-sun dark:drop-shadow-moon filter': shiny }}>
    <source type="image/webp" srcset="{BASE_URL}/images/webp/{name}.webp" />
    <source type="image/png" srcset="{BASE_URL}/images/png/{name}.png" />
    <img
      alt={name}
      src="{BASE_URL}/images/png/{name}.png"
      class={[{ 'animate-float': animated }, extraClass]}
      {...restProps}
    />
  </picture>
{/if}
