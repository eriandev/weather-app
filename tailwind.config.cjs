const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{html,js,svelte}'],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '1024px',
    },

    fontFamily: {
      manrope: ['Manrope', ...fontFamily.sans],
    },

    colors: {
      blue: '#27B1FF',
      orange: '#FF8E27',
      violet: '#5C4EB1',
      purple: '#BF8EDD',
      'grey-blue': '#8EC1DD',
      'grey-blue-dark': '#4E8DB1',

      gray: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827',
      },

      black: '#111111',
      white: '#FFFFFF',
      transparent: 'transparent',
    },
  },
}
