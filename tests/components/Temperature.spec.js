import { describe, expect, it } from 'vitest'
import { render } from 'test/utils.js'
import Temperature from '@/components/Temperature.svelte'

describe('Temperature component', () => {
  it('should be created', () => {
    const component = render(Temperature, { temp: { text: 'Sunny', number: 26 } })
    expect(component).toBeTruthy()
  })

  it('shows title and date inside when rendered', () => {
    const { getByText } = render(Temperature, { temp: { text: 'Sunny', number: 26 } })
    expect(getByText('26°')).toBeInTheDocument()
    expect(getByText('Sunny')).toBeInTheDocument()
  })
})
