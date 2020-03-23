import App from './App.svelte'
import { title, currentWeather, next5DaysWeather } from './store.js';

const currentPositionOptions = {
    enableHighAccuracy: false, 
    maximumAge        : 30000, 
    timeout           : 3000,
}



startApp()


async function startApp() {

    if('geolocation' in navigator) {

        getPosition()
    } else{

        console.warn('No hay geolocalización disponible')
        errorGeolocation()
    }
}


function getPosition() {

    navigator.geolocation.getCurrentPosition(successGeolocation, errorGeolocation, currentPositionOptions)

    async function successGeolocation(position) {

        let weatherInfo = await getWeather('weather', position.coords.latitude, position.coords.longitude)
        let next5DaysData = await getWeather('forecast', position.coords.latitude, position.coords.longitude)
        updateTitleStore(`${weatherInfo.name}, ${weatherInfo.sys.country}`)
        updateCurrentWeatherStore(weatherInfo)
        updateNext5DaysWeatherStore(next5DaysData)
    }
}


async function errorGeolocation() {

    let latlng = await getIpClient().then( res => res.loc.split(',') )
    let weatherInfo = await getWeather('weather', latlng[0].trim(), latlng[1].trim())
    let forecastInfo = await getWeather('forecast', latlng[0].trim(), latlng[1].trim())
    updateTitleStore(`${weatherInfo.name}, ${weatherInfo.sys.country}`)
    updateNext5DaysWeatherStore(forecastInfo)
    updateCurrentWeatherStore(weatherInfo)
}


async function getIpClient() {

    let response = await fetch('/.netlify/functions/ipclient').then(res => res.json())
    return response
}


async function getWeather(mode, lat, lon) {
    return await fetch(`/.netlify/functions/weather?mode=${mode}&lat=${lat}&lon=${lon}`).then(res => res.json())
}


function updateTitleStore(newTitle) {
    title.update(n => n = newTitle)
}


function updateCurrentWeatherStore(data) {

    let theWather = {
        id: data.weather[0].id,
        temp: data.main.temp,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
    }

    currentWeather.update(n => n = theWather)
}

function updateNext5DaysWeatherStore(data){

    let nextDays = get5NextDaysDate()

    let forecast1 = { ids: [], temps: [[], [], []] }
    let forecast2 = { ids: [], temps: [[], [], []] }
    let forecast3 = { ids: [], temps: [[], [], []] }
    let forecast4 = { ids: [], temps: [[], [], []] }
    let forecast5 = { ids: [], temps: [[], [], []] }

    data.list.forEach(the => {

        if(the.dt_txt.includes(nextDays[1])) {
            forecast1.ids.push(the.weather[0].id)
            forecast1.temps[0].push(the.main.temp_min)
            forecast1.temps[1].push(the.main.temp)
            forecast1.temps[2].push(the.main.temp_max)
        }

        if(the.dt_txt.includes(nextDays[2])) {
            forecast2.ids.push(the.weather[0].id)
            forecast2.temps[0].push(the.main.temp_min)
            forecast2.temps[1].push(the.main.temp)
            forecast2.temps[2].push(the.main.temp_max)
        }

        if(the.dt_txt.includes(nextDays[3])) {
            forecast3.ids.push(the.weather[0].id)
            forecast3.temps[0].push(the.main.temp_min)
            forecast3.temps[1].push(the.main.temp)
            forecast3.temps[2].push(the.main.temp_max)
        }

        if(the.dt_txt.includes(nextDays[4])) {
            forecast4.ids.push(the.weather[0].id)
            forecast4.temps[0].push(the.main.temp_min)
            forecast4.temps[1].push(the.main.temp)
            forecast4.temps[2].push(the.main.temp_max)
        }

        if(the.dt_txt.includes(nextDays[5])) {
            forecast5.ids.push(the.weather[0].id)
            forecast5.temps[0].push(the.main.temp_min)
            forecast5.temps[1].push(the.main.temp)
            forecast5.temps[2].push(the.main.temp_max)
        }
    })

    let day1 = [getMiddleId(forecast1.ids), [ Math.round(Math.min(...forecast1.temps[0])),  getProm(forecast1.temps[1]),  Math.round(Math.max(...forecast1.temps[2]))] ]
    let day2 = [getMiddleId(forecast2.ids), [ Math.round(Math.min(...forecast2.temps[0])),  getProm(forecast2.temps[1]),  Math.round(Math.max(...forecast2.temps[2]))] ]
    let day3 = [getMiddleId(forecast3.ids), [ Math.round(Math.min(...forecast3.temps[0])),  getProm(forecast3.temps[1]),  Math.round(Math.max(...forecast3.temps[2]))] ]
    let day4 = [getMiddleId(forecast4.ids), [ Math.round(Math.min(...forecast4.temps[0])),  getProm(forecast4.temps[1]),  Math.round(Math.max(...forecast4.temps[2]))] ]
    let day5 = [getMiddleId(forecast5.ids), [ Math.round(Math.min(...forecast5.temps[0])),  getProm(forecast5.temps[1]),  Math.round(Math.max(...forecast5.temps[2]))] ]

    let theForecast = {
        id: [ day1[0], day2[0], day3[0], day4[0], day5[0] ],
        temp_max: [ day1[1][2], day2[1][2], day3[1][2], day4[1][2], day5[1][2] ],
        temp: [ day1[1][1], day2[1][1], day3[1][1], day4[1][1], day5[1][1] ],
        temp_min: [ day1[1][0], day2[1][0], day3[1][0], day4[1][0], day5[1][0] ],
        updated: true
    }

    next5DaysWeather.update(n => n = theForecast)
}

function getMiddleId(array) {

    return array[Math.floor(array.length/2)]
}

function getProm(array) {

    let acu = 0
    for (let i = 0; i < array.length; i++) {
        
        acu += array[i]        
    }

    return Math.round(acu/array.length)
}

function get5NextDaysDate(){

    const today = new Date(2020, 2, 22, 12, 0, 0, 0)
    const day1 = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '00')}-${today.getDate().toString().padStart(2, '00')}`

    const secondDay = new Date(today)
    secondDay.setDate(secondDay.getDate() + 1)
    const day2 = `${secondDay.getFullYear()}-${(secondDay.getMonth() + 1).toString().padStart(2, '00')}-${secondDay.getDate().toString().padStart(2, '00')}`

    const thirdDay  = new Date(today)
    thirdDay.setDate(thirdDay.getDate() + 2)
    const day3 = `${thirdDay.getFullYear()}-${(thirdDay.getMonth() + 1).toString().padStart(2, '00')}-${thirdDay.getDate().toString().padStart(2, '00')}`

    const fourthDay = new Date(today)
    fourthDay.setDate(fourthDay.getDate() + 3)
    const day4 = `${fourthDay.getFullYear()}-${(fourthDay.getMonth() + 1).toString().padStart(2, '00')}-${fourthDay.getDate().toString().padStart(2, '00')}`

    const fifthDay  = new Date(today)
    fifthDay.setDate(fifthDay.getDate() + 4)
    const day5 = `${fifthDay.getFullYear()}-${(fifthDay.getMonth() + 1).toString().padStart(2, '00')}-${fifthDay.getDate().toString().padStart(2, '00')}`

    const sixthDay  = new Date(today)
    sixthDay.setDate(sixthDay.getDate() + 5)
    const day6 = `${sixthDay.getFullYear()}-${(sixthDay.getMonth() + 1).toString().padStart(2, '00')}-${sixthDay.getDate().toString().padStart(2, '00')}`

    return [day1, day2, day3, day4, day5, day6]
}


const app = new App({
	target: document.body,
})

export default app
