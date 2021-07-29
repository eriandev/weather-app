
/** @type { import('@types/tailwindcss/tailwind-config').TailwindConfig } **/
module.exports = {
  purge: ['./**/*.html', './**/*.svelte'],
  theme: {
    screens: {
      'xs': '400px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    container: {
      center: true,
      padding: '2rem',
    },
    borderRadius: {
      none: '0',
      DEFAULT: '0.25rem',
      sm: '0.125rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '1.5rem',
      '2xl': '2.5rem',
      full: '9999px',
    },
  },
  variants: {
    margin: ['responsive', 'first', 'hover', 'focus'],
  },
  plugins: [],
}
