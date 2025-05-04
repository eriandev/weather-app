import { afterEach, describe, expect, it, vi } from 'vitest'
import LocationModal, { openModal } from '@/components/LocationModal.svelte'
import { render } from 'test/utils.js'

vi.mock('$app/env', () => ({ browser: true }))
vi.mock('$env/dynamic/public', () => ({ env: import.meta.env }))

describe('LocationModal component', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should be created', () => {
    const component = render(LocationModal)
    expect(component).toBeTruthy()
  })

  it('should be displayed', () => {
    openModal()
    const { getByText } = render(LocationModal)
    expect(getByText("I can't find you")).toBeDefined()
    expect(getByText("I'm here 🗺️")).toBeDefined()
  })
})
