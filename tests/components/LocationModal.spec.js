import { describe, expect, it, vi } from 'vitest'
import { render } from 'test/utils.js'
import LocationModal, { openModal } from '@/components/LocationModal.svelte'

vi.mock('$app/env', () => ({ browser: true }))

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
    expect(getByText(`I can't find you`)).toBeInTheDocument()
    expect(getByText(`I'm here 🗺️`)).toBeInTheDocument()
  })
})
