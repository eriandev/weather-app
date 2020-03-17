import App from './App.svelte'
import { title, currentWeather } from './store.js';

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

        let weatherInfo = await getWeather(position.coords.latitude, position.coords.longitude)
        updateTitleStore(`${weatherInfo.name}, ${weatherInfo.sys.country}`)
        updateCurrentWeatherStore(weatherInfo)
    }
}


async function errorGeolocation() {

    let latlng = await getIpClient().then( res => res.loc.split(',') )
    let weatherInfo = await getWeather(latlng[0].trim(), latlng[1].trim())
    updateTitleStore(`${weatherInfo.name}, ${weatherInfo.sys.country}`)
    updateCurrentWeatherStore(weatherInfo)
}


async function getIpClient() {

    let response = await fetch('/.netlify/functions/ipclient').then(res => res.json())
    return response
}


async function getWeather(lat, lon) {
    return await fetch(`/.netlify/functions/weather?lat=${lat}&lon=${lon}`).then(res => res.json())
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


const app = new App({
	target: document.body,
})

export default app
