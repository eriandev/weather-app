import { env } from '$env/dynamic/private'

export const API_HOST = env.RAPIAPI_HOST
export const API_KEY = env.RAPIAPI_KEY
export const API_URL = env.RAPIAPI_URL

export const API_REQUEST_OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': API_HOST ?? '',
    'X-RapidAPI-Key': API_KEY ?? ''
  }
}

export const AVAIBLE_ENDPOINTS = ['current', 'forecast']
