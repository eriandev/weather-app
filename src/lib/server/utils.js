import { MONTHS_LIST } from '$lib/client/consts'
import weatherCodes from '$lib/client/data/weather_codes.json'

/**
 * @param {object|null} body
 * @param {number|ResponseInit} params
 * @returns {Response}
 */
export function response(body, params) {
  const ok = isResponseOk(params)
  const init = typeof params === 'number' ? { status: params } : params
  return new Response(JSON.stringify({ ok, ...body }), init)
}

/**
 * @param {number|ResponseInit=} value
 * @returns {boolean}
 */
export function isResponseOk(value) {
  if (value == null) return false
  if (typeof value === 'number') return value >= 200 && value <= 299
  return value?.status ? value.status >= 200 && value.status <= 299 : false
}

/**
 * @param {number} code
 * @returns {string}
 */
export function getConditionByCode(code) {
  // @ts-expect-error TODO: refactor
  return weatherCodes?.[code] ?? ''
}

/**
 * @param {number=} unixTime
 * @returns {string=}
 */
export function getFormattedDateByUnixTime(unixTime) {
  if (!unixTime || typeof unixTime !== 'number') return undefined
  const date = new Date(unixTime * 1000)
  const monthNumber = date.getMonth()
  const dayNumber = date.getDate()
  const year = date.getFullYear()
  return `${MONTHS_LIST[monthNumber]} ${dayNumber}, ${year}`
}
