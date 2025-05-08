<script lang="ts">
  import type { HTMLImgAttributes } from 'svelte/elements'

  interface ImageProps extends Omit<HTMLImgAttributes, 'loading'> {
    name: string
    lazy?: boolean
    shiny?: boolean
    animated?: boolean
  }

  const { name, animated = false, shiny = false, lazy = false, class: extraClass, ...restProps }: ImageProps = $props()
  const shinyClass = 'drop-shadow-sun dark:drop-shadow-moon filter'
  const loading = lazy ? 'lazy' : 'eager'
  const animatedClass = 'animate-float'
</script>

<img
  {loading}
  {...restProps}
  src="/images/{name}.webp"
  class={[{ [animatedClass]: animated, [shinyClass]: shiny }, extraClass]}
/>
