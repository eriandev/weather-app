<script>
  import { useCurrentWeather } from '@/hooks'
  import Icon from '@/components/Icon.svelte'

  const [currentWeather] = useCurrentWeather()
</script>

<header class="header">
  <section>
    <span>{$currentWeather.locationDate}</span>
    <h1>{$currentWeather.locationName}</h1>
  </section>

  <Icon name="location" color="#4B5563" />
</header>
