import { MONTHS_LIST } from '$lib/client/consts'
import weatherCodes from '$lib/client/data/weather_codes.json'

export function response(body: Record<string, unknown> | null, params: number | ResponseInit) {
  const ok = isResponseOk(params)
  const init = typeof params === 'number' ? { status: params } : params
  return new Response(JSON.stringify({ ok, ...body }), init)
}

export function isResponseOk(value?: number | ResponseInit) {
  if (value == null) return false
  if (typeof value === 'number') return value >= 200 && value <= 299
  return value?.status ? value.status >= 200 && value.status <= 299 : false
}

export function getConditionByCode(code: number): string {
  // @ts-expect-error TODO: refactor
  return weatherCodes?.[code] ?? ''
}

export function getFormattedDateByUnixTime(unixTime?: number) {
  if (!unixTime || typeof unixTime !== 'number') return undefined

  const date = new Date(unixTime * 1000)
  const monthNumber = date.getMonth()
  const dayNumber = date.getDate()
  const year = date.getFullYear()

  return `${MONTHS_LIST[monthNumber]} ${dayNumber}, ${year}`
}
