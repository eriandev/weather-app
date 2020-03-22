import { writable } from 'svelte/store'

export const title = writable('...')

export const currentWeather = writable({
    id: 0,
    temp: '-',
    humidity: '',
    windSpeed: ''
})

export const next5DaysWeather = writable({
    id: 0,
    temp: 20,
    temp_max: 30,
    temp_min: 10
})
