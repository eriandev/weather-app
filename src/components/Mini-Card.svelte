<script>
    export let dayName, temp, tempMin, tempMax
</script>

<div class="bg-teal-600 flex-none w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 h-48 mx-3 lg:mx-4 text-white rounded-xl shadow-md">
    <div class="py-2">{dayName}</div>
    <img class="h-16 mx-auto" src="./images/broken_clouds.png" alt="Nubes rotas">
    <div class="text-lg">{temp !== '-' ? `${temp}°` : temp}</div>

    <div class="flex flex-wrap">
        <div class="w-1/2">
            <div class="w-full">
                <svg class="h-6 w-6 mx-auto fill-current text-white"><use href="#arrow-down"></use></svg>
            </div>
            <div class="w-full">{tempMin !== '-' ? `${tempMin}°` : tempMin}</div>
        </div>
        <div class="w-1/2">
            <div class="w-full">
                <svg class="h-6 w-6 mx-auto fill-current text-white"><use href="#arrow-up"></use></svg>
            </div>
            <div class="w-full">{tempMax !== '-' ? `${tempMax}°` : tempMax}</div>
        </div>
    </div>
</div>

<svg hidden="hidden">
    <defs>

        <symbol id="arrow-down" viewBox="0 0 20 20">
            <title>Arrow Down</title>
            <path d="M4.5 7.5c.5-.4 1-.4 1.6 0l3.9 3.8 4-3.8c.4-.4 1-.4 1.5 0 .4.5.4 1.2 0 1.7l-4.7 4.5a1 1 0 01-1.6 0L4.5 9.2c-.4-.5-.4-1.2 0-1.7z"/>
        </symbol>
    
        <symbol id="arrow-up" viewBox="0 0 20 20">
            <title>Arrow Up</title>
            <path d="M15.5 12.5c-.5.4-1 .4-1.6 0L10 8.7l-4 3.8c-.4.4-1 .4-1.5 0-.4-.5-.4-1.2 0-1.7l4.7-4.5a1 1 0 011.6 0l4.7 4.5c.4.5.4 1.2 0 1.7z"/>
        </symbol>

    </defs>
</svg>
