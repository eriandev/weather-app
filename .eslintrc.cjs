/** @type {import('eslint').Linter.BaseConfig} */
module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
    browser: true
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest'
  },
  overrides: [
    {
      files: ['*.js'],
      extends: ['standard'],
      rules: {
        'prefer-promise-reject-errors': 'off'
      }
    },
    {
      files: ['*.svelte'],
      plugins: ['prettier'],
      parser: 'svelte-eslint-parser',
      extends: ['plugin:svelte/recommended'],
      rules: {
        'prettier/prettier': 'error'
      }
    },
    {
      files: ['*.spec.js'],
      env: {
        jest: true
      }
    }
  ]
}
