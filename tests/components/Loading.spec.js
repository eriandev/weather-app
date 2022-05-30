import { describe, expect, it } from 'vitest'
import { render } from 'test/utils.js'
import Loading from '@/components/Loading.svelte'

describe('Loading component', () => {
  it('should be created', () => {
    const component = render(Loading)
    expect(component).toBeTruthy()
  })
})
