<script>
  import { onMount } from 'svelte'
  import { useCurrentWeather } from '@/hooks'
  import Header from '@/components/Header.svelte'
  import Picture from '@/components/Picture.svelte'
  import Temperature from '@/components/Temperature.svelte'

  const [_, update] = useCurrentWeather()

  onMount(() => update())
</script>

<Header />
<Picture animated class="mt-12" name="day-sun" alt="Day Sun" />
<Temperature />
