import { describe, expect, it } from 'vitest'
import { render } from 'test/utils.js'
import Header from '@/components/Header.svelte'

describe('Header component', () => {
  it('should be created', () => {
    const component = render(Header, { title: 'Kraków', date: 'September 10, 2021' })
    expect(component).toBeTruthy()
  })

  it('shows title and date inside when rendered', () => {
    const { getByText } = render(Header, { title: 'Kraków', date: 'September 10, 2021' })
    expect(getByText('September 10, 2021')).toBeInTheDocument()
    expect(getByText('Kraków')).toBeInTheDocument()
  })
})
