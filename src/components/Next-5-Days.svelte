<script>
    import { forecast } from '../store.js'
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

<h3>Pronóstico de la semana</h3>

<article>
    
    {#each Array(5) as item, i}

        <MiniCard   updated={$forecast.updated}
                    id={$forecast.id[i]} 
                    dayName={next5DaysNames[i]} 
                    temp={$forecast.temp[i]} 
                    tempMin={$forecast.temp_min[i]} 
                    tempMax={$forecast.temp_max[i]} />

    {/each}

    <aside></aside>

</article>

<style>
    h3 {
        @apply pt-2 text-lg font-bold text-center;
    }

    article {
        @apply flex justify-between pt-4 pb-2 overflow-y-hidden text-center flex-nowrap lg:flex-wrap lg:justify-center xs:pb-4 xs:pl-4;
    }

    aside {
        @apply flex-none invisible px-2 xs:px-4 lg:hidden;
    }
</style>
