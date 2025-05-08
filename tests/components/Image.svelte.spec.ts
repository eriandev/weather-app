import { describe, expect, it, vi } from 'vitest'
import Image from '@/components/Image.svelte'
import { render } from 'test/utils'

vi.mock('$env/dynamic/public', () => ({ env: import.meta.env }))

describe('Image component', () => {
  it('should be created', () => {
    const component = render(Image, { name: 'day-sun', alt: 'Day Sun' })
    expect(component).toBeTruthy()
  })

  it('should have the correct source', () => {
    const { container } = render(Image, { name: 'day-sun', alt: 'Day Sun' })
    const getImgSource = () => container.querySelector('img')?.getAttribute('src')
    expect(getImgSource()).toEqual('/images/day-sun.webp')
  })
})
