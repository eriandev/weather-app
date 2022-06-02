import { describe, expect, it } from 'vitest'
import { getConditionByCode, getFormattedDateByUnixTime } from '@/shared/functions'
import weatherCodes from '@/assets/weather_codes.json'

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
    expect(result).toEqual('June 1, 2022')
  })
})
