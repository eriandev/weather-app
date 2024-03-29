import { BASE_URL } from '$lib/client/consts'
import { API_REQUEST_OPTIONS, API_URL } from '$lib/server/consts'
import { getConditionByCode, getFormattedDateByUnixTime, response } from '$lib/server/utils'

/**
 * @type {import('./$types').RequestHandler}
 * @see https://kit.svelte.dev/docs/routing#endpoints
 */
export async function GET ({ fetch, getClientAddress, url }) {
  const query = url.searchParams.get('q') ?? getClientAddress()

  const isNotFromAppItself = !(BASE_URL === url.origin)

  if (isNotFromAppItself) {
    return response(null, 418)
  }

  try {
    const GET_WEATHER_DATA_URL = `${API_URL}/forecast.json?q=${query}`
    const apiResponse = await fetch(GET_WEATHER_DATA_URL, API_REQUEST_OPTIONS)
    /** @type {ForecastResponse & ErrorResponse} */
    const { current: cur, location: loc, forecast, error } = await apiResponse.json()

    if (error) return response({ error }, 400)

    const current = {
      isDay: Boolean(cur.is_day),
      condition: {
        text: cur.condition.text,
        time: getConditionByCode(cur.condition.code)
      },
      temp: {
        c: 12.0,
        f: 53.6
      }
    }

    const location = {
      name: loc.name,
      country: loc.country,
      locationDate: getFormattedDateByUnixTime(loc.localtime_epoch)
    }

    return response({ current, location, forecast: forecast.forecastday }, 200)
  } catch (error) {
    console.warn(error)
    return response({ error: { message: 'Request failed' } }, 410)
  }
}

/**
 * @typedef {object} GetForecastData
 * @prop {boolean} ok Status check
 * @prop {FormattedCurrent} current Information about the current weather
 * @prop {FormattedLocation} location Information about the requested location
 * @prop {Array<Forecastday>} forecast Weather forecasts for the following days
 * @prop {ErrorResponse['error']=} error Possible error response
 */

/**
 * @typedef FormattedLocation
 * @type {object}
 *
 * @prop {string} name Location name
 * @prop {string} country Location country
 * @prop {string} locationDate Local date time
*/

/**
 * @typedef FormattedCurrent
 * @type {object}
 *
 * @prop {boolean} isDay Day status
 * @prop {object} temp Temperature in celsius
 * @prop {number} temp.c Temperature in celsius
 * @prop {number} temp.f Temperature in fahrenheit
 * @prop {object} condition
 * @prop {string} condition.text Weather condition text
 * @prop {string} condition.time Weather condition time
*/

/**
 * @typedef ErrorResponse
 * @type {object}
 *
 * @prop {object} error
 * @prop {string} error.message Error description
 */

/**
 * @typedef ForecastResponse
 * @type {object}
 *
 * @prop {object} location
 * @prop {string} location.name Location name
 * @prop {string} location.region Region or state of the location, if availa
 * @prop {string} location.country Location country
 * @prop {number} location.lat Latitude in decimal degree
 * @prop {number} location.lon Longitude in decimal degree
 * @prop {string} location.tz_id Time zone name
 * @prop {number} location.localtime_epoch Local date and time in unix time
 * @prop {string} location.localtime Local date and time
 *
 * @prop {object} current
 * @prop {number} current.last_updated_epoch Local time when the real time data was updated in unix time
 * @prop {string} current.last_updated  Local time when the real time data was updated
 * @prop {number} current.temp_c Temperature in celsius
 * @prop {number} current.temp_f Temperature in fahrenheit
 * @prop {number} current.is_day 1 = Yes, 0 = No
 *
 * @prop {object} current.condition
 * @prop {string} current.condition.icon Weather icon url
 * @prop {string} current.condition.text Weather condition text
 * @prop {number} current.condition.code Weather condition unique code
 *
 * @prop {number} current.wind_mph Wind speed in miles per hour
 * @prop {number} current.wind_kph Wind speed in kilometer per hour
 * @prop {number} current.wind_degree Wind direction in degrees
 * @prop {string} current.wind_dir Wind direction as 16 point compass. e.g.: NSW
 * @prop {number} current.pressure_mb Pressure in millibars
 * @prop {number} current.pressure_in Pressure in inches
 * @prop {number} current.precip_mm Precipitation amount in millimeters
 * @prop {number} current.precip_in Precipitation amount in inches
 * @prop {number} current.humidity Humidity as percentage
 * @prop {number} current.cloud Cloud cover as percentage
 * @prop {number} current.feelslike_c Feels like temperature in celsius
 * @prop {number} current.feelslike_f Feels like temperature in fahrenheit
 * @prop {number} current.vis_km Average visibility in kilometer
 * @prop {number} current.vis_miles Average visibility in miles
 * @prop {number} current.gust_mph Wind gust in miles per hour
 * @prop {number} current.gust_kph Wind gust in kilometer per hour
 * @prop {number} current.uv UV Index
 *
 * @prop {object} forecast
 * @prop {Array<Forecastday>} forecast.forecastday Weather forecasts for the following days
 */

/**
 * @typedef Forecastday
 * @type {object}
 *
 * @prop {string} date Forecast date
 * @prop {number} date_epoch Forecast date as unix time
 *
 * @prop {object} day
 * @prop {number} day.maxtemp_c Maximum temperature in celsius for the day
 * @prop {number} day.maxtemp_f Maximum temperature in fahrenheit for the day
 * @prop {number} day.mintemp_c Minimum temperature in celsius for the day
 * @prop {number} day.mintemp_f Minimum temperature in fahrenheit for the day
 * @prop {number} day.avgtemp_c Average temperature in celsius for the day
 * @prop {number} day.avgtemp_f Average temperature in fahrenheit for the day
 * @prop {number} day.maxwind_mph Maximum wind speed in miles per hour
 * @prop {number} day.maxwind_kph Maximum wind speed in kilometer per hour
 * @prop {number} day.totalprecip_mm Total precipitation in milimeter
 * @prop {number} day.totalprecip_in Total precipitation in inches
 * @prop {number} day.avgvis_km Average visibility in kilometer
 * @prop {number} day.avgvis_miles Average visibility in miles
 * @prop {number} day.avghumidity Average humidity as percentage
 * @prop {number} day.daily_will_it_rain No info
 * @prop {number} day.daily_chance_of_rain No info
 * @prop {number} day.daily_will_it_snow No info
 * @prop {number} day.daily_chance_of_snow No info
 * @prop {number} day.uv UV Index
 *
 * @prop {object} day.condition
 * @prop {string} day.condition.icon Weather icon url
 * @prop {string} day.condition.text Weather condition text
 * @prop {number} day.condition.code Weather condition unique code
 *
 * @prop {object} hour
 * @prop {number} hour.time_epoch Time as epoch
 * @prop {string} hour.time Date and time
 * @prop {number} hour.temp_c Temperature in celsius
 * @prop {number} hour.temp_f Temperature in fahrenheit
 * @prop {number} hour.is_day 1 = Yes 0 = No
 *
 * @prop {object} hour.condition
 * @prop {string} hour.condition.icon Weather icon url
 * @prop {string} hour.condition.text Weather condition text
 * @prop {number} hour.condition.code Weather condition unique code
 *
 * @prop {number} hour.wind_mph Maximum wind speed in miles per hour
 * @prop {number} hour.wind_kph Maximum wind speed in kilometer per hour
 * @prop {number} hour.wind_degree Wind direction in degrees
 * @prop {string} hour.wind_dir Wind direction as 16 point compass. e.g.: NSW
 * @prop {number} hour.pressure_mb Pressure in millibars
 * @prop {number} hour.pressure_in Pressure in inches
 * @prop {number} hour.precip_mm Precipitation amount in millimeters
 * @prop {number} hour.precip_in Precipitation amount in inches
 * @prop {number} hour.humidity Humidity as percentage
 * @prop {number} hour.cloud Cloud cover as percentage
 * @prop {number} hour.feelslike_c Feels like temperature as celcius
 * @prop {number} hour.feelslike_f Feels like temperature as fahrenheit
 * @prop {number} hour.windchill_c Windchill temperature in celcius
 * @prop {number} hour.windchill_f Windchill temperature in fahrenheit
 * @prop {number} hour.heatindex_c Heat index in celcius
 * @prop {number} hour.heatindex_f Heat index in fahrenheit
 * @prop {number} hour.dewpoint_c Dew point in celcius
 * @prop {number} hour.dewpoint_f Dew point in fahrenheit
 * @prop {number} hour.will_it_rain 1 = Yes 0 = No
 * @prop {number} hour.will_it_snow 1 = Yes 0 = No
 * @prop {number} hour.chance_of_rain Chance of rain as percentage
 * @prop {number} hour.chance_of_snow Chance of snow as percentage
 * @prop {number} hour.vis_km Visibility in kilometer
 * @prop {number} hour.vis_miles Visibility in miles
 * @prop {number} hour.gust_mph Wind gust in miles per hour
 * @prop {number} hour.gust_kph Wind gust in kilometer per hour
 * @prop {number} hour.uv UV Index
 *
 * @prop {object} astro
 * @prop {string} astro.sunrise Sunrise time
 * @prop {string} astro.sunset Sunset time
 * @prop {string} astro.moonrise Moonrise time
 * @prop {string} astro.moonset Moonset time
 * @prop {string} astro.moon_illumination Moon illumination as %
 * @prop {string} astro.moon_phase
 * | Moon phases. Value returned:|
 * |-----------------------------|
 * | New Moon                    |
 * | Waxing Crescent             |
 * | First Quarter               |
 * | Waxing Gibbous              |
 * | Full Moon                   |
 * | Waning Gibbous              |
 * | Last Quarter                |
 * | Waning Crescent             |
 */
