<script>
    import Card from './Card.svelte'

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

<div class="flex flex-no-wrap lg:flex-wrap lg:justify-center py-4 overflow-y-hidden text-center">
    
    {#each Array(5) as item, i}

        <Card isToday={false} dayName={next5DaysNames[i]}/>

    {/each}

    <div class="w-1/12 invisible lg:hidden">.</div>

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
    