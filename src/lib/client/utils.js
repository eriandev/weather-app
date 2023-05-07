import { MONTHS_LIST } from '$lib/client/consts'
import weatherCodes from '$lib/client/data/weather_codes.json'

/**
 * @param {number} code
 * @returns {string}
 */
export function getConditionByCode (code) {
  // @ts-ignore
  return weatherCodes?.[code] ?? ''
}

/**
 * @param {number} unixTime
 * @returns {string=}
 */
export function getFormattedDateByUnixTime (unixTime) {
  if (!unixTime || typeof unixTime !== 'number') return undefined
  const date = new Date(unixTime * 1000)
  const monthNumber = date.getMonth()
  const dayNumber = date.getDate()
  const year = date.getFullYear()
  return `${MONTHS_LIST[monthNumber]} ${dayNumber}, ${year}`
}

/**
 * @param {() => void} callBack
 * @param {number=} delay
 */
export function debounce (callBack, delay = 1000) {
  /** @type {NodeJS.Timeout | undefined} */
  /* eslint-disable-next-line */
  let timeoutRef
  clearTimeout(timeoutRef)
  timeoutRef = setTimeout(callBack, delay)
}
