export * from './useCurrentWeather.js'
export * from './useDarkMode.js'

/**
 * @template T
 * @typedef {function(): { currentWeather: Subscribe<T>, updateCurrentStore: UpdateStore }} UseCurrentWeather
*/

/**
 * @typedef {function(string=): Promise<void>} UpdateStore
*/

/**
 * @template T
 * @typedef {{ subscribe: import('svelte/store').Readable<T>['subscribe'] }} Subscribe
*/
