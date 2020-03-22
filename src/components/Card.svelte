<script>
    import { currentWeather } from '../store.js'

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
