export * from './useCurrentWeather.js'
export * from './useDarkMode.js'

/**
 * @template T
 * @typedef {function(): [Subscribe<T>, UpdateStore]} UseWeather
*/

/**
 * @typedef {function(string=): Promise<void>} UpdateStore
*/

/**
 * @template T
 * @typedef {{ subscribe: import('svelte/store').Readable<T>['subscribe'] }} Subscribe
*/
