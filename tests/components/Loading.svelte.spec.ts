import { describe, expect, it } from 'vitest'
import Loading from '@/components/Loading.svelte'
import { render } from 'test/utils'

describe('Loading component', () => {
  it('should be created', () => {
    const component = render(Loading)
    expect(component).toBeTruthy()
  })
})
