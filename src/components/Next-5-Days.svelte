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

<div class="pt-2 text-center text-lg font-bold">Pronóstico de la semana</div>

<div class="flex flex-no-wrap lg:flex-wrap justify-between lg:justify-center pt-4 pb-2 xs:pb-4 xs:pl-4 overflow-y-hidden text-center">
    
    {#each Array(5) as item, i}

        <MiniCard   updated={$forecast.updated}
                    id={$forecast.id[i]} 
                    dayName={next5DaysNames[i]} 
                    temp={$forecast.temp[i]} 
                    tempMin={$forecast.temp_min[i]} 
                    tempMax={$forecast.temp_max[i]} />

    {/each}

    <div class="flex-none px-2 xs:px-4 invisible lg:hidden"></div>

</div>
