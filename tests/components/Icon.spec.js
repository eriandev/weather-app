import { describe, expect, it } from 'vitest'
import { render } from 'test/utils.js'
import Icon from '@/components/Icon.svelte'

describe('Icon component', () => {
  it('should be created', () => {
    const component = render(Icon, { name: 'home' })
    expect(component).toBeTruthy()
  })
})
