import path from 'node:path'
import { fileURLToPath } from 'node:url'
import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-auto'

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    vite: {
      resolve: {
        alias: {
          '@': path.resolve(dirname, './src'),
          'test': path.resolve(dirname, './tests'),
        }
      }
    }
  },
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],
}

export default config
