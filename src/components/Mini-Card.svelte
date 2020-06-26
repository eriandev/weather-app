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

<div class={`${bgColor} flex-none w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 h-48 ml-4 lg:mx-4 text-white rounded-xl shadow-md`}>
    <div class="py-2">{dayName}</div>
    <img class="h-16 mx-auto" src="./images/{imgToShow}.png" alt={descToSay}>
    <div class="text-lg">{temp !== '-' ? `${temp}°` : temp}</div>

    <div class="flex flex-wrap">
        <div class="w-1/2">
            <div class="w-full">
                <svg class="h-6 w-6 mx-auto fill-current text-white">
                    <path d="M4.5 7.5c.5-.4 1-.4 1.6 0l3.9 3.8 4-3.8c.4-.4 1-.4 1.5 0 .4.5.4 1.2 0 1.7l-4.7 4.5a1 1 0 01-1.6 0L4.5 9.2c-.4-.5-.4-1.2 0-1.7z"/>
                </svg>
            </div>
            <div class="w-full">{tempMin !== '-' ? `${tempMin}°` : tempMin}</div>
        </div>
        <div class="w-1/2">
            <div class="w-full">
                <svg class="h-6 w-6 mx-auto fill-current text-white">
                    <path d="M15.5 12.5c-.5.4-1 .4-1.6 0L10 8.7l-4 3.8c-.4.4-1 .4-1.5 0-.4-.5-.4-1.2 0-1.7l4.7-4.5a1 1 0 011.6 0l4.7 4.5c.4.5.4 1.2 0 1.7z"/>
                </svg>
            </div>
            <div class="w-full">{tempMax !== '-' ? `${tempMax}°` : tempMax}</div>
        </div>
    </div>
</div>
