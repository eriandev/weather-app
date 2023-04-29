<script>
  /** @type {string} */
  export let tempCondition
  /** @type {number} */
  export let tempDegrees
</script>

<section class="font-extrabold">
  <h2
    class="bg-clip-text text-[144px] leading-[196px] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(180deg,#111827_0%,#6B7280_100%)] dark:[-webkit-background-clip:text] dark:[-webkit-text-fill-color:transparent] dark:[background:linear-gradient(180deg,#F3F4F6_0%,#1F2937_100%)]"
  >
    {tempDegrees}°
  </h2>
  <span class="text-{tempCondition} text-2xl capitalize">{tempCondition}</span>
</section>
