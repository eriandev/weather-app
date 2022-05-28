<script>
  import { useCurrentWeather } from '@/hooks'

  const [_, currentWeather] = useCurrentWeather()
</script>

<section class="temp">
  <h2>{$currentWeather.tempDegress}°</h2>
  <span class="text-{$currentWeather.tempCondition}">{$currentWeather.tempCondition}</span>
</section>
