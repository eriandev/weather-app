import { writable } from 'svelte/store'

export const title = writable('...')

export const currentWeather = writable({
    id: 0,
    temp: '-',
    humidity: '',
    windSpeed: ''
})

export const next5DaysWeather = writable({
    id: [0, 0, 0, 0, 0],
    temp_max: ['-', '-', '-', '-', '-'],
    temp: ['-', '-', '-', '-', '-'],
    temp_min: ['-', '-', '-', '-', '-']
})
