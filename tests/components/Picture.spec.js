import { describe, expect, it } from 'vitest'
import { render } from 'test/utils.js'
import { BASE_URL } from '@/shared/constants'
import Picture from '@/components/Picture.svelte'

describe('Picture component', () => {
  it('should be created', () => {
    const component = render(Picture, { name: 'day-sun', alt: 'Day Sun' })
    expect(component).toBeTruthy()
  })

  it('should have the correct source', () => {
    const { container } = render(Picture, { name: 'day-sun', alt: 'Day Sun' })
    const getImgSource = () => container.querySelector('img').getAttribute('src')
    expect(getImgSource()).toEqual(`${BASE_URL}images/png/day-sun.png`)
  })
})
