/**
 * @param {object|null} body
 * @param {number|ResponseInit} params
 * @returns {Response}
 */
export function response (body, params) {
  const ok = isResponseOk(params)
  const init = typeof params === 'number' ? { status: params } : params
  return new Response(JSON.stringify({ ok, ...body }), init)
}

/**
 * @param {number|ResponseInit} value
 * @returns {boolean}
 */
function isResponseOk (value) {
  if (!value) return false
  if (typeof value === 'number') return value >= 200 && value <= 299
  return value?.status ? value.status >= 200 && value.status <= 299 : false
}
