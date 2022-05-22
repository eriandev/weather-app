<script>
  /** @type {string} */
  export let name
  /** @type {string} */
  export let alt
  /** @type {boolean} */
  export let animated = false
</script>

<picture class="filter drop-shadow-2xl">
  <source srcset="images/webp/{name}.webp" type="image/webp" />
  <source srcset="images/png/{name}.png" type="image/png" /> 
  <img class:animated src="images/png/{name}.png" {alt} title={alt} {...$$restProps} on:click />
</picture>

<style lang="postcss">
  .animated {
    animation: float 6s ease-in-out infinite;
  }

  @keyframes float {
    0% { transform: translatey(0px) }
    50% { transform: translatey(-20px) }
    100% { transform: translatey(0px) }
  }
</style>
