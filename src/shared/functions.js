import weatherCodes from '@/assets/weather_codes.json'

/**
 * @param {number} code
 * @returns {string}
*/
export function getConditionByCode(code) {
  // @ts-ignore
  return weatherCodes?.[code] ? weatherCodes[code] : ''
}
