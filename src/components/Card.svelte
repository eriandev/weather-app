<script>
    import { weather } from '../store.js'

    let title     = '.'
    let imgToShow = 'unknown'
    let descToSay = 'clima desconocido'
    let bgColor   = 'moonlit-asteroid'

    $:  if($weather.id !== 0) {

            let firstDigit = []
            $weather.id.toString().split('').forEach( d => firstDigit.push(d))

            fetch(`https://erianvc.github.io/api/weather-app/group${firstDigit[0]}/`)
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

<section>

    <span class="today">Hoy</span>

    <article class={bgColor}>
        <span class="temp">{$weather.temp}{$weather.temp !== '-' ? '°' : ''}</span>
        <span class="title">{title}</span>
        <div class="content">
            <div class="more-info">
                {#if $weather.humidity !== '' && $weather.windSpeed !== ''}
                    <span class="pt-2">Humedad de {$weather.humidity}%</span>
                    <span class="pt-2">Vientos de {$weather.windSpeed}km/hr</span>
                {/if}
            </div>
            <div class="image">
                <img src="./images/{imgToShow}.png" alt={descToSay}>
            </div>
        </div>
    </article>

</section>

<style>
    section {
        @apply container w-full max-w-sm px-4 py-6 xs:py-12 xl:py-16;
    }

    .today {
        @apply block text-center;
    }

    article {
        @apply flex flex-col text-white shadow-xl rounded-2xl;
    }

    .temp {
        @apply py-2 mx-auto text-5xl font-semibold;
    }

    .title {
        @apply mx-auto;
    }

    .content {
        @apply flex flex-wrap;
    }

    .more-info {
        @apply flex flex-col w-1/2 pt-8 font-thin text-center;
    }

    .image {
        @apply w-1/2;
    }
</style>
