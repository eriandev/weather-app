import { describe, expect, it } from 'vitest'
import { isResponseOk, response } from '@/shared/utils.server'

describe('response function', () => {
  it('should return the same status', () => {
    const status = 418
    const result = response(null, status)
    expect(result.status).toEqual(status)
  })

  it('should return the same headers', () => {
    const headers = { 'Content-type': 'application/pdf' }
    const result = response(null, { headers })
    expect(result.headers.get('Content-type')).toEqual(headers['Content-type'])
  })
})

describe('isResponseOk function', () => {
  it('should return false when the value is falsy', () => {
    const ok = isResponseOk()
    expect(ok).toEqual(false)
  })

  it('should return true when the value is between 200 & 299', () => {
    const ok = isResponseOk(200)
    const isNotOk = isResponseOk(404)

    expect(ok).toEqual(true)
    expect(isNotOk).toEqual(false)
  })

  it('should get the status code when the value is a object', () => {
    const ok = isResponseOk({ status: 200 })
    const isNotOk = isResponseOk({ status: 404 })

    expect(ok).toEqual(true)
    expect(isNotOk).toEqual(false)
  })
})
