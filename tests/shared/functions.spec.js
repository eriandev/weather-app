import { describe, expect, it } from 'vitest'
import { MONTHS_LIST } from '@/shared/constants'
import { getConditionByCode, getFormattedDateByUnixTime } from '@/shared/functions'
import weatherCodes from '@/assets/weather_codes.json'

const date = new Date(1654137000 * 1000)
const monthNumber = date.getMonth()
const dayNumber = date.getDate()
const year = date.getFullYear()
const formattedDate = `${MONTHS_LIST[monthNumber]} ${dayNumber}, ${year}`

describe('getConditionByCode function', () => {
  it('should return empty string', () => {
    const result = getConditionByCode('1654137000')
    expect(result).toEqual('')
  })

  it('should give the expected result', () => {
    const result = getConditionByCode(1000)
    expect(result).toEqual(weatherCodes[1000])
  })
})

describe('getFormattedDateByUnixTime function', () => {
  it('should return undefined', () => {
    const result = getFormattedDateByUnixTime('1654137000')
    expect(result).toBeUndefined()
  })

  it('should return the expected result', () => {
    const result = getFormattedDateByUnixTime(1654137000)
    expect(result).toEqual(formattedDate)
  })
})
