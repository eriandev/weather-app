export * from './useCurrentWeather.js'

/**
 * @template T
 * @typedef {function(): [UpdateStore, Subscribe<T>]} UseWeather
*/

/**
 * @typedef {function(string=): Promise<void>} UpdateStore
*/

/**
 * @template T
 * @typedef {{ subscribe: import('svelte/store').Readable<T>['subscribe'] }} Subscribe
*/

/**
 * @typedef {object} GetWeatherResponse
 * @prop {boolean} ok — Status check
 * @prop {import('@/routes/api/weather/[endpoint].js').WeatherData} data — Response data
 * @prop {import('@/routes/api/weather/[endpoint].js').ErrorResponse['error']=} error — Possible error response
*/
