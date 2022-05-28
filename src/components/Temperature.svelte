<script>
  /** @type {string} */
  export let tempCondition
  /** @type {number} */
  export let tempDegrees
</script>

<section class="temp">
  <h2>{tempDegrees}°</h2>
  <span class="text-{tempCondition}">{tempCondition}</span>
</section>
