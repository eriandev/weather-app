<script>
  // @ts-ignore
  import InlineSVG from 'svelte-inline-svg'

  /** @type {string} */
  export let name
  /** @type {number} */
  export let size = 32

  const sizing = {
    width: size,
    height: size,
  }
</script>

<InlineSVG src="icons/{name}.svg" {...sizing} {...$$restProps} on:click />
