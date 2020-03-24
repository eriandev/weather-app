import App from './App.svelte'
import { title, weather, forecast } from './store.js';

const currentPositionOptions = {
    enableHighAccuracy: false, 
    maximumAge        : 30000, 
    timeout           : 3000,
}



startApp()



async function startApp() {

    if('geolocation' in navigator) {
        getPosition()
    } else {
        errorGeolocation()
    }
}


function getPosition() {

    navigator.geolocation.getCurrentPosition(successGeolocation, errorGeolocation, currentPositionOptions)

    async function successGeolocation(position) {

        let weatherData = await getWeatherClient('weather', position.coords.latitude, position.coords.longitude)
        let forecastData = await getWeatherClient('forecast', position.coords.latitude, position.coords.longitude)
        updateTitleStore(`${weatherData.name}, ${weatherData.sys.country}`)
        updateWeatherStore(weatherData)
        updateForecastStore(forecastData)
    }
}


async function errorGeolocation() {

    let latlng = await getIpClient().then( res => res.loc.split(',') )
    let weatherData = await getWeatherClient('weather', latlng[0].trim(), latlng[1].trim())
    let forecastData = await getWeatherClient('forecast', latlng[0].trim(), latlng[1].trim())
    updateTitleStore(`${weatherData.name}, ${weatherData.sys.country}`)
    updateWeatherStore(weatherData)
    updateForecastStore(forecastData)
}


async function getIpClient() {
    return await fetch('/.netlify/functions/ipclient').then(res => res.json())
}


async function getWeatherClient(mode, lat, lon) {
    return await fetch(`/.netlify/functions/weather?mode=${mode}&lat=${lat}&lon=${lon}`).then(res => res.json())
}


function updateTitleStore(newTitle) {
    title.update(n => n = newTitle)
}


function updateWeatherStore(data) {

    let theWather = {
        id: data.weather[0].id,
        temp: data.main.temp,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
    }

    weather.update(n => n = theWather)
}


function updateForecastStore(data){

    let info = formatData(data)
    let newForecast = {

        id: [ info[1].id, info[2].id, info[3].id, info[4].id, info[5].id ],

        temp_max: [ info[1].tempMax, info[2].tempMax, info[3].tempMax, info[4].tempMax, info[5].tempMax ],

        temp: [ info[1].temp, info[2].temp, info[3].temp, info[4].temp, info[5].temp ],

        temp_min: [ info[1].tempMin, info[2].tempMin, info[3].tempMin, info[4].tempMin, info[5].tempMin ],

        updated: true
    }

    forecast.update(n => n = newForecast)
}


function formatData(data){

    let nextDays = getNextDaysDate()
    let allData = [

        { day: nextDays[1], ids: [], temps: [[], [], []] },
        { day: nextDays[2], ids: [], temps: [[], [], []] },
        { day: nextDays[3], ids: [], temps: [[], [], []] },
        { day: nextDays[4], ids: [], temps: [[], [], []] },
        { day: nextDays[5], ids: [], temps: [[], [], []] }
    ]

    data.list.forEach(the => {

        allData.forEach(elem => {
            
            if(the.dt_txt.includes(elem.day)) {
                elem.ids.push(the.weather[0].id)
                elem.temps[0].push(the.main.temp_min)
                elem.temps[1].push(the.main.temp)
                elem.temps[2].push(the.main.temp_max)
            }
        })
    })

    let formatData = [null]
    for (let i = 0; i < allData.length; i++) {
        
        formatData.push({

            id: getMiddleId(allData[i].ids), 
            tempMin: Math.round(Math.min(...allData[i].temps[0])),
            temp: Math.round( getProm(allData[i].temps[1]) ),
            tempMax: Math.round(Math.max(...allData[i].temps[2]))
        })
    }

    return formatData
}


function getMiddleId(allIds) {
    return allIds[Math.floor(allIds.length/2)]
}


function getProm(allTemps) {

    let sumAllTemps = 0
    for (let i = 0; i < allTemps.length; i++) {
        
        sumAllTemps += allTemps[i]        
    }

    return Math.round(sumAllTemps/allTemps.length)
}


function getNextDaysDate(){

    const today     = new Date()
    let nextDates   = []

    for (let i = 0; i < 6; i++) {

        const newDate = new Date(today)
        newDate.setDate(newDate.getDate() + i)
        const dateFormat = `${newDate.getFullYear()}-${(newDate.getMonth() + 1).toString().padStart(2, '00')}-${newDate.getDate().toString().padStart(2, '00')}`
        nextDates.push(dateFormat)
    }

    return nextDates
}


const app = new App({
	target: document.body,
})

export default app
