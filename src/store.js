import { writable } from 'svelte/store'

export const title = writable('...')

export const weather = writable({
    id: 0,
    temp: '-',
    humidity: '',
    windSpeed: ''
})

export const forecast = writable({
    id: [0, 0, 0, 0, 0],
    temp_max: ['-', '-', '-', '-', '-'],
    temp: ['-', '-', '-', '-', '-'],
    temp_min: ['-', '-', '-', '-', '-'],
    updated: false
})
