import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/svelte'

afterEach(() => {
  cleanup()
})

export * from '@testing-library/svelte'
export { default as userEvent } from '@testing-library/user-event'
