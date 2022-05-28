/** @type {import('eslint').Linter.BaseConfig} */
module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
    browser: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  extends: ['eslint:recommended'],
  plugins: ['svelte3'],
  rules: {
    'no-unused-vars': [
      'warn',{ destructuredArrayIgnorePattern: '^_$' }
    ],
  },
  overrides: [
    {
      files: ['**/*.svelte'],
      processor: 'svelte3/svelte3',
    },
    {
      files: ['**/*.spec.js'],
      env: {
        jest: true,
      },
    },
  ],
}
