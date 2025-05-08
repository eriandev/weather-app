import { describe, expect, it } from 'vitest'
import Temperature from '@/components/Temperature.svelte'
import { render } from 'test/utils'

describe('Temperature component', () => {
  it('should be created', () => {
    const component = render(Temperature, { tempCondition: 'Sunny', tempDegrees: 26 })
    expect(component).toBeTruthy()
  })

  it('shows title and date inside when rendered', () => {
    const { getByText } = render(Temperature, { tempCondition: 'Sunny', tempDegrees: 26 })
    expect(getByText('26°')).toBeDefined()
    expect(getByText('Sunny')).toBeDefined()
  })
})
