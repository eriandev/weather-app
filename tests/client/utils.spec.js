import { describe, expect, it, vi } from 'vitest'
import { MONTHS_LIST } from '$lib/client/consts'
import weatherCodes from '$lib/client/data/weather_codes.json'
import { getConditionByCode, getFormattedDateByUnixTime } from '$lib/server/utils'

const date = new Date(1654137000 * 1000)
const monthNumber = date.getMonth()
const dayNumber = date.getDate()
const year = date.getFullYear()
const formattedDate = `${MONTHS_LIST[monthNumber]} ${dayNumber}, ${year}`

vi.mock('$env/dynamic/public', () => ({ env: import.meta.env }))

describe('getConditionByCode function', () => {
  it('should return empty string', () => {
    const result = getConditionByCode(1654137000)
    expect(result).toEqual('')
  })

  it('should give the expected result', () => {
    const result = getConditionByCode(1000)
    expect(result).toEqual(weatherCodes[1000])
  })
})

describe('getFormattedDateByUnixTime function', () => {
  it('should return undefined', () => {
    // @ts-ignore
    const result = getFormattedDateByUnixTime()
    expect(result).toBeUndefined()
  })

  it('should return the expected result', () => {
    const result = getFormattedDateByUnixTime(1654137000)
    expect(result).toEqual(formattedDate)
  })
})
