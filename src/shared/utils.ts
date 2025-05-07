import { MONTHS_LIST, WEATHER_CODES } from '@/shared/consts'

export function debounce(callBack: () => void, delay = 1000) {
  // eslint-disable-next-line prefer-const
  let timeoutRef: NodeJS.Timeout | undefined
  clearTimeout(timeoutRef)
  timeoutRef = setTimeout(callBack, delay)
}

export function getConditionByCode(code: number): string {
  return WEATHER_CODES?.[code] ?? ''
}

export function getFormattedDateByUnixTime(unixTime?: number) {
  if (!unixTime || typeof unixTime !== 'number') return undefined

  const date = new Date(unixTime * 1000)
  const monthNumber = date.getMonth()
  const dayNumber = date.getDate()
  const year = date.getFullYear()

  return `${MONTHS_LIST[monthNumber]} ${dayNumber}, ${year}`
}
