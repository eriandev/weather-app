import { afterEach, describe, expect, it, vi } from 'vitest'
import { useGeolocation } from '$lib/hooks/useGeolocation.svelte'
import GeolocationModal from '@/components/GeolocationModal.svelte'
import { render } from 'test/utils'

vi.mock('$app/env', () => ({ browser: true }))
vi.mock('$env/dynamic/public', () => ({ env: import.meta.env }))

describe('GeolocationModal component', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should be created', () => {
    const component = render(GeolocationModal)
    expect(component).toBeTruthy()
  })

  it('should be displayed', () => {
    const geolocation = useGeolocation()

    geolocation.openModal()
    const { getByText } = render(GeolocationModal)
    expect(getByText("I can't find you")).toBeDefined()
    expect(getByText("I'm here 🗺️")).toBeDefined()
  })
})
