<script>
  /** @type {string} */
  export let name
  /** @type {string} */
  export let alt
  /** @type {boolean} */
  export let animated = false
</script>

<picture class="image">
  <source srcset="images/webp/{name}.webp" type="image/webp" />
  <source srcset="images/png/{name}.png" type="image/png" /> 
  <img class:animated src="images/png/{name}.png" {alt} title={alt} {...$$restProps} on:click />
</picture>
