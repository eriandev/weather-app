export * from './useCurrentWeather.js'

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
