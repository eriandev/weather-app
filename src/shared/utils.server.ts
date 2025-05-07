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
