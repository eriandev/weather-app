<script>
  import { onMount } from 'svelte'
  import { useCurrentWeather } from '@/hooks'
  import Header from '@/components/Header.svelte'
  import Picture from '@/components/Picture.svelte'
  import Temperature from '@/components/Temperature.svelte'

  const [weather, update] = useCurrentWeather()

  onMount(() => update())
</script>

<Header title={$weather.locationName} date={$weather.locationDate} />
<Picture animated class="mt-12" name={$weather.tempImage} />
<Temperature tempDegrees={$weather.tempDegrees} tempCondition={$weather.tempCondition} />
