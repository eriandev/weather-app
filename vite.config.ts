import url from 'node:url'
import path from 'node:path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { sveltekit } from '@sveltejs/kit/vite'
import { svelteTesting } from '@testing-library/svelte/vite'

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(url.fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
      test: path.resolve(dirname, './tests'),
    },
  },
  test: {
    workspace: [
      {
        extends: './vite.config.ts',
        plugins: [svelteTesting()],
        test: {
          name: 'client',
          clearMocks: true,
          environment: 'happy-dom',
          include: ['tests/**/*.{client,svelte}.spec.ts'],
          exclude: ['tests/**/*.server.spec.ts'],
          setupFiles: ['./vitest-setup-client.ts'],
        },
      },
      {
        extends: './vite.config.ts',
        test: {
          name: 'server',
          environment: 'node',
          include: ['tests/**/*.server.spec.ts'],
          exclude: ['tests/**/*.{client,svelte}.spec.ts'],
        },
      },
    ],
  },
})
