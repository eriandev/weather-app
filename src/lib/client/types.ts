export interface CurrentWeatherStore {
  /** Day status */
  isDay: boolean
  /** Failed status */
  failed: boolean
  /** Loading status */
  loading: boolean
  /** Location name */
  locationName: string
  /** Weather condition text */
  tempText: string
  /** Location country */
  locationCountry: string
  /** Temperature in celsius */
  tempDegrees: number
  /** Weather condition image name */
  tempImage: string
  /** Weather condition image name */
  tempCondition: string
  /** Local date and time */
  locationDate: string | undefined
  /** Error description */
  errorMessage?: string
}
