<script>
    import { next5DaysWeather } from '../store.js'
    import MiniCard from './Mini-Card.svelte'

    const weekDays = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    const day = new Date()
    const todayNumber = day.getDay()
    const next5DaysNames = getNext5DaysNames()

    function getNext5DaysNames() {

        let result = []
        for (let i = todayNumber + 1; i < todayNumber + 6; i++) {
            if (i > 6) {
                const dayName = weekDays[i-7]
                result.push(dayName)
            } else{
                const dayName = weekDays[i]
                result.push(dayName)
            }
        
        }
        return result
    }
</script>

<div class="py-3 text-center text-lg font-bold">Próximamente</div>

<div class="flex flex-no-wrap lg:flex-wrap justify-between lg:justify-center py-4 overflow-y-hidden text-center">

    <div class="flex-none w-1/5 sm:w-1/3 md:w-2/5 md:-mx-4 invisible lg:hidden">
        Don't see me
    </div>
    
    {#each Array(5) as item, i}

        <MiniCard dayName={next5DaysNames[i]} temp={$next5DaysWeather.temp[i]} tempMin={$next5DaysWeather.temp_min[i]} tempMax={$next5DaysWeather.temp_max[i]} />

    {/each}

    <div class="flex-none w-1/5 sm:w-1/3 md:w-2/5 md:-mx-4 invisible lg:hidden">
        Don't see me
    </div>

</div>

<style>

    .flex::-webkit-scrollbar{
        height: 0.2rem
    }
    .flex::-webkit-scrollbar-thumb{
        background-color: gainsboro;
    }
    .flex::-webkit-scrollbar-track{
        background-color: white;
    }

</style>
    