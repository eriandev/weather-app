<script>
    export let updated, id, dayName, temp, tempMin, tempMax

    let title     = '.'
    let imgToShow = 'unknown'
    let descToSay = 'clima desconocido'
    let bgColor   = 'moonlit-asteroid'

    $:  if(updated) {

        let firstDigit = []
        id.toString().split('').forEach( d => firstDigit.push(d))

        fetch(`https://erianvc.github.io/api/weather-app/group${firstDigit[0]}/`)
            .then( res => res.json())
            .then( data => {

                data.forEach(the => {
                    if(the.id === id) {
                        title = the.title
                        imgToShow = the.image
                        descToSay = the.description
                    }
                })
            })
            .catch(err => console.log(err))
    }

    $: if(temp !== '-') {

        temp > 35 ? bgColor = 'flare' : null
        temp > 25 && temp < 36 ? bgColor = 'blooker-20' : null
        temp > 10 && temp < 26 ? bgColor = 'blue-sky' : null
        temp < 11 ? bgColor = 'cool-sky' : null
    }
</script>

<article class={bgColor}>
    <h4>{dayName}</h4>
    <img src="./images/{imgToShow}.png" alt={descToSay}>
    <span>{temp !== '-' ? `${temp}°` : temp}</span>

    <div class="info">
        <div class="temp-range">
            <div>
                <svg>
                    <path d="M4.5 7.5c.5-.4 1-.4 1.6 0l3.9 3.8 4-3.8c.4-.4 1-.4 1.5 0 .4.5.4 1.2 0 1.7l-4.7 4.5a1 1 0 01-1.6 0L4.5 9.2c-.4-.5-.4-1.2 0-1.7z"/>
                </svg>
            </div>
            <div>{tempMin !== '-' ? `${tempMin}°` : tempMin}</div>
        </div>
        <div class="temp-range">
            <div>
                <svg>
                    <path d="M15.5 12.5c-.5.4-1 .4-1.6 0L10 8.7l-4 3.8c-.4.4-1 .4-1.5 0-.4-.5-.4-1.2 0-1.7l4.7-4.5a1 1 0 011.6 0l4.7 4.5c.4.5.4 1.2 0 1.7z"/>
                </svg>
            </div>
            <div>{tempMax !== '-' ? `${tempMax}°` : tempMax}</div>
        </div>
    </div>
</article>

<style>
    article {
        @apply flex-none w-1/2 h-48 ml-4 text-white shadow-md sm:w-1/3 md:w-1/4 lg:w-1/6 lg:mx-4 rounded-xl;
    }

    h4 {
        @apply py-2;
    }

    img {
        @apply h-16 mx-auto;
    }

    span {
        @apply text-lg;
    }

    .info {
        @apply flex flex-wrap;
    }

    .temp-range {
        @apply w-1/2;
    }

    .temp-range div {
        @apply w-full;
    }

    svg {
        @apply w-6 h-6 mx-auto text-white fill-current;
    }
</style>
