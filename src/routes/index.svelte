<script>
  import { onMount, onDestroy } from 'svelte'
  import { useCurrentWeather } from '@/hooks'
  import Header from '@/components/Header.svelte'
  import Picture from '@/components/Picture.svelte'
  import Temperature from '@/components/Temperature.svelte'

  const [weather, update] = useCurrentWeather()
  /** @type {import('svelte/store').Unsubscriber} */
  let unsubscribe = () => {}

  onMount(async () => {
    const htmlRef = document.querySelector('html')
    await update()
    unsubscribe = weather.subscribe(val => {
      if(htmlRef) htmlRef.classList[val.isDay ? 'remove' : 'add']('dark')
    })
  })
  onDestroy(() => unsubscribe())
</script>

<Header title={$weather.locationName} date={$weather.locationDate} />
<Picture animated name={$weather.tempImage} class="mt-12 aspect-square" />
<Temperature tempDegrees={$weather.tempDegrees} tempCondition={$weather.tempCondition} />
