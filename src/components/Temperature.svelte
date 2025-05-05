<script lang="ts">
  interface TemperatureProps {
    tempCondition: string
    tempDegrees: number
  }

  const { tempCondition, tempDegrees }: TemperatureProps = $props()
</script>

<section class="font-extrabold">
  <h2 class="temp text-[144px] leading-[196px]">
    {tempDegrees}°
  </h2>
  <span class="text-{tempCondition} text-2xl capitalize">{tempCondition}</span>
</section>

<style>
  h2 {
    background: linear-gradient(180deg, #111827 0%, #6b7280 100%);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
  }

  :global(.dark h2.temp) {
    background: linear-gradient(180deg, #f3f4f6 0%, #1f2937 100%);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
  }
</style>
