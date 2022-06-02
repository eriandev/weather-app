export { default as useCurrentWeather } from './useCurrentWeather.js'
export { default as useDarkMode } from './useDarkMode.js'
export { default as useGeolocation } from './useGeolocation.js'

/**
 * @template T
 * @typedef {function(): { updateCurrentStore: UpdateStore, tryUpdateWithCoords: () => Promise<void> }} UseCurrentWeather
*/

/**
 * @typedef {function(string=): Promise<void>} UpdateStore
*/

/**
 * @template T
 * @typedef {{ subscribe: import('svelte/store').Readable<T>['subscribe'] }} Subscribe
*/
