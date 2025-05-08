import { RAPIAPI_HOST, RAPIAPI_KEY, RAPIAPI_URL } from '$env/static/private'

export const API_HOST = RAPIAPI_HOST
export const API_KEY = RAPIAPI_KEY
export const API_URL = RAPIAPI_URL

export const AVAIBLE_ENDPOINTS = ['current', 'forecast'] as const

export const API_REQUEST_OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': API_HOST ?? '',
    'X-RapidAPI-Key': API_KEY ?? ''
  }
} as const
