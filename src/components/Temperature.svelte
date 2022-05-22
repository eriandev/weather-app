<script>
  /**
   * @typedef Temperature
   * @type {object}
   * @property {string} text - forecast weather conditions.
   * @property {number} number - temperature in Celsius or Fahrenheit.
   */

  /** @type {Temperature} */
  export let temp
</script>

<section class="temp">
  <h2>{temp.number}°</h2>
  <span class="text-{temp.text}">{temp.text}</span>
</section>
