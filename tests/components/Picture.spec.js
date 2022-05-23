import { describe, expect, it } from 'vitest'
import { render } from 'test/utils.js'
import Picture from '@/components/Picture.svelte'

describe('Picture component', () => {
  it('should be created', () => {
    const component = render(Picture, { name: 'day-sun', alt: 'Day Sun' })
    expect(component).toBeTruthy()
  })
})
