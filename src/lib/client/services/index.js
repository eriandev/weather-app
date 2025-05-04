export * from './weather.js'

/**
 * @typedef GetCurrentWeather
 * @type {function(string=): Promise<import('@/routes/api/current/+server').GetCurrentData>}
 */

/**
 * @typedef GetForecastWeather
 * @type {function(string=): Promise<import('@/routes/api/forecast/+server').GetForecastData>}
 */
