<script>
    import { weather } from '../store.js'

    let title     = '.'
    let imgToShow = 'unknown'
    let descToSay = 'clima desconocido'
    let bgColor   = 'moonlit-asteroid'

    $:  if($weather.id !== 0) {

            let firstDigit = []
            $weather.id.toString().split('').forEach( d => firstDigit.push(d))

            fetch(`https://erianvc.github.io/API/weather-app/data/group${firstDigit[0]}xx.json`)
                .then( res => res.json())
                .then( data => {

                    data.forEach(the => {
                        if(the.id === $weather.id) {
                            title = the.title
                            imgToShow = the.image
                            descToSay = the.description
                        }
                    })
                })
                .catch(err => console.log(err))
        }

    $: if($weather.temp !== '-') {

        $weather.temp > 35 ? bgColor = 'flare' : null
        $weather.temp > 25 && $weather.temp < 36 ? bgColor = 'blooker-20' : null
        $weather.temp > 10 && $weather.temp < 26 ? bgColor = 'blue-sky' : null
        $weather.temp < 11 ? bgColor = 'cool-sky' : null
    }

</script>

<div class="container max-w-sm w-full py-6 xs:py-12 xl:py-16 px-4">

    <div class="text-center">Hoy</div>

    <div class={`${bgColor} flex flex-col text-white rounded-xxl shadow-xl`}>
        <span class="text-5xl font-semibold mx-auto py-2">{$weather.temp}{$weather.temp !== '-' ? '°' : ''}</span>
        <span class="mx-auto">{title}</span>
        <div class="flex flex-wrap">
            <div class="w-1/2 flex flex-col text-center pt-8 font-thin">
                {#if $weather.humidity !== '' && $weather.windSpeed !== ''}
                    <span class="pt-2">Humedad de {$weather.humidity}%</span>
                    <span class="pt-2">Vientos de {$weather.windSpeed}km/hr</span>
                {/if}
            </div>
            <div class="w-1/2">
                <img src={`./images/${imgToShow}.png`} alt={descToSay}>
            </div>
        </div>
    </div>

</div>
