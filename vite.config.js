import url from 'node:url'
import path from 'node:path'
import { defineConfig } from 'vitest/config'
import { sveltekit } from '@sveltejs/kit/vite'

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(url.fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
      test: path.resolve(dirname, './tests')
    }
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './tests/setup.js'
  }
})
