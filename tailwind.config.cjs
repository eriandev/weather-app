const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{html,js,svelte}'],
  safelist: [
    'text-wind',
    'text-rain',
    'text-snow',
    'text-sunny',
    'text-clouds',
    'text-clear',
    'text-thunderstorm',
  ],
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
      wind: '#27B1FF',
      rain: '#4E8DB1',
      snow: '#8EC1DD',
      sunny: '#FF8E27',
      clear: '#FF8E27',
      clouds: '#8EC1DD',
      thunderstorm: '#BF8EDD',

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

      black: '#0F141E',
      white: '#FFFFFF',
      transparent: 'transparent',
    },
  },
}
