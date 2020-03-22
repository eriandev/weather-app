<script>
    import { currentWeather } from '../store.js'
    export let isToday
    export let dayName

    let title     = '.'
    let imgToShow = 'unknown'
    let descToSay = 'clima desconocido'
    let bgColor   = 'moonlit-asteroid'

    $:  if($currentWeather.id !== 0) {

            let firstDigit = []
            $currentWeather.id.toString().split('').forEach( d => firstDigit.push(d))

            fetch(`https://erianvc.github.io/API/weather-app/data/group${firstDigit[0]}xx.json`)
                .then( res => res.json())
                .then( data => {

                    data.forEach(the => {
                        if(the.id === $currentWeather.id) {
                            title = the.title
                            imgToShow = the.image
                            descToSay = the.description
                        }
                    })
                })
                .catch(err => console.log(err))
        }

    $: if($currentWeather.temp !== '-') {

        $currentWeather.temp > 35 ? bgColor = 'flare' : null
        $currentWeather.temp > 25 && $currentWeather.temp < 36 ? bgColor = 'blooker-20' : null
        $currentWeather.temp > 10 && $currentWeather.temp < 26 ? bgColor = 'blue-sky' : null
        $currentWeather.temp < 11 ? bgColor = 'cool-sky' : null
    }

</script>

{#if isToday}
    <div class="container max-w-sm w-full py-6 xs:py-12 xl:py-16 px-4">

        <div class="text-center text-gray-800">Hoy</div>

        <div class={`${bgColor} flex flex-col text-white rounded-xxl shadow-xl`}>
            <span class="text-5xl font-semibold mx-auto py-2">{$currentWeather.temp}{$currentWeather.temp !== '-' ? '°' : ''}</span>
            <span class="mx-auto">{title}</span>
            <div class="flex flex-wrap">
                <div class="w-1/2 flex flex-col text-center pt-8 font-thin">
                    {#if $currentWeather.humidity !== '' && $currentWeather.windSpeed !== ''}
                        <span class="pt-2">Humedad de {$currentWeather.humidity}%</span>
                        <span class="pt-2">Vientos de {$currentWeather.windSpeed}km/hr</span>
                    {/if}
                </div>
                <div class="w-1/2">
                    <img src={`./images/${imgToShow}.png`} alt={descToSay}>
                </div>
            </div>
        </div>

    </div>
{:else}
    <div class="bg-teal-600 flex-none w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 h-48 mx-3 lg:mx-4 text-white rounded-xl shadow-md">
        <div class="py-2">{dayName}</div>
        <img class="h-16 mx-auto" src="./images/broken_clouds.png" alt="Nubes rotas">
        <div class="text-lg">20°</div>

        <div class="flex flex-wrap">
            <div class="w-1/2">
                <div class="w-full">
                    <svg class="h-6 w-6 mx-auto fill-current text-white" viewBox="0 0 20 20">
                        <path d="M4.5 7.5c.5-.4 1-.4 1.6 0l3.9 3.8 4-3.8c.4-.4 1-.4 1.5 0 .4.5.4 1.2 0 1.7l-4.7 4.5a1 1 0 01-1.6 0L4.5 9.2c-.4-.5-.4-1.2 0-1.7z"/>
                    </svg>
                </div>
                <div class="w-full">11°</div>
            </div>
            <div class="w-1/2">
                <div class="w-full">
                    <svg class="h-6 w-6 mx-auto fill-current text-white" viewBox="0 0 20 20">
                        <path d="M15.5 12.5c-.5.4-1 .4-1.6 0L10 8.7l-4 3.8c-.4.4-1 .4-1.5 0-.4-.5-.4-1.2 0-1.7l4.7-4.5a1 1 0 011.6 0l4.7 4.5c.4.5.4 1.2 0 1.7z"/>
                    </svg>
                </div>
                <div class="w-full">21°</div>
            </div>
        </div>
    </div>
{/if}
