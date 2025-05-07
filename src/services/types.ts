export interface GetCurrentData {
  /** Status check */
  ok: boolean
  /** Information about the current weather */
  current: FormattedCurrent
  /** Information about the requested location */
  location: FormattedLocation
  /** Possible error response */
  error?: ErrorResponse['error']
}

export interface FormattedLocation {
  /** Location name */
  name: string
  /** Location country */
  country: string
  /** Local date time */
  locationDate: string
}

export interface FormattedCurrent {
  /** Day status */
  isDay: boolean
  /** Temperature */
  temp: {
    /** Temperature in celsius */
    c: number
    /** Temperature in fahrenheit */
    f: number
  }
  /** Weather condition */
  condition: {
    /** Weather condition text */
    text: string
    /** Weather condition time */
    time: string
  }
}

export interface ErrorResponse {
  error: {
    /** Error description */
    message: string
  }
}

export interface CurrentResponse {
  location: Location
  current: Current
}

interface Location {
  /** Location name */
  name: string
  /** Region or state of the location, if availa */
  region: string
  /** Location country */
  country: string
  /** Latitude in decimal degree */
  lat: number
  /** Longitude in decimal degree */
  lon: number
  /** Time zone name */
  tz_id: string
  /** Local date and time in unix time */
  localtime_epoch: number
  /** Local date and time */
  localtime: string
}

interface Condition {
  /** Weather icon url */
  icon: string
  /** Weather condition text */
  text: string
  /** Weather condition unique code */
  code: number
}

interface Current {
  /** Local time when the real time data was updated in unix time */
  last_updated_epoch: number
  /** Local time when the real time data was updated */
  last_updated: string
  /** Temperature in celsius */
  temp_c: number
  /** Temperature in fahrenheit */
  temp_f: number
  /** 1 = Yes, 0 = No */
  is_day: number
  condition: Condition
  /** Wind speed in miles per hour */
  wind_mph: number
  /** Wind speed in kilometer per hour */
  wind_kph: number
  /** Wind direction in degrees */
  wind_degree: number
  /** Wind direction as 16 point compass. e.g.: NSW */
  wind_dir: string
  /** Pressure in millibars */
  pressure_mb: number
  /** Pressure in inches */
  pressure_in: number
  /** Precipitation amount in millimeters */
  precip_mm: number
  /** Precipitation amount in inches */
  precip_in: number
  /** Humidity as percentage */
  humidity: number
  /** Cloud cover as percentage */
  cloud: number
  /** Feels like temperature in celsius */
  feelslike_c: number
  /** Feels like temperature in fahrenheit */
  feelslike_f: number
  /** Average visibility in kilometer */
  vis_km: number
  /** Average visibility in miles */
  vis_miles: number
  /** Wind gust in miles per hour */
  gust_mph: number
  /** Wind gust in kilometer per hour */
  gust_kph: number
  /** UV Index */
  uv_index?: number
}

export interface GetForecastData {
  /** Status check */
  ok: boolean
  /** Information about the current weather */
  current: FormattedCurrent
  /** Information about the requested location */
  location: boolean
  /** Weather forecasts for the following days */
  forecast: boolean
  /** Possible error response */
  error?: ErrorResponse['error']
}

export interface FormattedCurrent {
  /** Day status */
  isDay: boolean
  /** Temperature */
  temp: {
    /** Temperature in celsius */
    c: number
    /** Temperature in fahrenheit */
    f: number
  }
  /** Weather condition */
  condition: {
    /** Weather condition text */
    text: string
    /** Weather condition time */
    time: string
  }
}

export interface ForecastResponse extends CurrentResponse {
  forecast: {
    /** Weather forecasts for the following days */
    forecastday: Forecastday[]
  }
}

interface Day {
  /** Maximum temperature in celsius for the day */
  maxtemp_c: number
  /** Maximum temperature in fahrenheit for the day */
  maxtemp_f: number
  /** Minimum temperature in celsius for the day */
  mintemp_c: number
  /** Minimum temperature in fahrenheit for the day */
  mintemp_f: number
  /** Average temperature in celsius for the day */
  avgtemp_c: number
  /** Average temperature in fahrenheit for the day */
  avgtemp_f: number
  /** Maximum wind speed in miles per hour */
  maxwind_mph: number
  /** Maximum wind speed in kilometer per hour */
  maxwind_kph: number
  /** Total precipitation in milimeter */
  totalprecip_mm: number
  /** Total precipitation in inches */
  totalprecip_in: number
  /** Average visibility in kilometer */
  avgvis_km: number
  /** Average visibility in miles */
  avgvis_miles: number
  /** Average humidity as percentage */
  avghumidity: number
  daily_will_it_rain: number
  daily_chance_of_rain: number
  daily_will_it_snow: number
  daily_chance_of_snow: number
  /** UV Index */
  uv: number
  condition: Condition
}

interface Hour {
  /** Time as epoch */
  time_epoch: number
  /** Date and time */
  time: string
  /** Temperature in celsius */
  temp_c: number
  /** Temperature in fahrenheit */
  temp_f: number
  /** 1 = Yes 0 = No */
  is_day: boolean
  condition: Condition
  /** Maximum wind speed in miles per hour */
  wind_mph: number
  /** Maximum wind speed in kilometer per hour */
  wind_kph: number
  /** Wind direction in degrees */
  wind_degree: number
  /** Wind direction as 16 point compass. e.g.: NSW */
  wind_dir: string
  /** Pressure in millibars */
  pressure_mb: number
  /** Pressure in inches */
  pressure_in: number
  /** Precipitation amount in millimeters */
  precip_mm: number
  /** Precipitation amount in inches */
  precip_in: number
  /** Humidity as percentage */
  humidity: number
  /** Cloud cover as percentage */
  cloud: number
  /** Feels like temperature as celcius */
  feelslike_c: number
  /** Feels like temperature as fahrenheit */
  feelslike_f: number
  /** Windchill temperature in celcius */
  windchill_c: number
  /** Windchill temperature in fahrenheit */
  windchill_f: number
  /** Heat index in celcius */
  heatindex_c: number
  /** Heat index in fahrenheit */
  heatindex_f: number
  /** Dew point in celcius */
  dewpoint_c: number
  /** Dew point in fahrenheit */
  dewpoint_f: number
  /** 1 = Yes 0 = No */
  will_it_rain: boolean
  /** 1 = Yes 0 = No */
  will_it_snow: boolean
  /** Chance of rain as percentage */
  chance_of_rain: number
  /** Chance of snow as percentage */
  chance_of_snow: number
  /** Visibility in kilometer */
  vis_km: number
  /** Visibility in miles */
  vis_miles: number
  /** Wind gust in miles per hour */
  gust_mph: number
  /** Wind gust in kilometer per hour */
  gust_kph: number
  /** UV Index */
  uv: number
}

interface Astro {
  /** Sunrise time */
  sunrise: string
  /** Sunset time */
  sunset: string
  /** Moonrise time */
  moonrise: string
  /** Moonset time */
  moonset: string
  /** Moon illumination as % */
  moon_illumination: string
  /**
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
  moon_phase: string
}

interface Forecastday {
  /** Forecast date */
  date: string
  /** Forecast date as unix time */
  date_epoch: number
  day: Day
  hour: Hour[]
  astro: Astro
}
