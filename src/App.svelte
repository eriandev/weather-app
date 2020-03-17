<script>
import { currentWeather } from './store.js'
    import Header from './components/Header.svelte'
    import Card from './components/Card.svelte'
    import Next5Days from './components/Next-5-Days.svelte'
</script>

<Header />

<Card isToday={true} dayName={null} />

<Next5Days />

<style>
</style>
