const colors = require('tailwindcss/colors')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': {
          'base': '#024161',
          'light': '#326B83',
          'dark': '#012F4D'
        },
        'secondary': {
          'base': '#D16A28',
          'light': '#D9814C',
          'dark': '#B54E1B'
        },
        'tertiary': {
          'base': '#A9A9A9',
          'light': '#C2C2C2',
          'dark': '#7F7F7F'
        },
        'background': '#F7F7F7',
        'text-primary': '#FFFFFF',
        'text-bg': '#333333'
      },
    },
  },
  variants: {},
  plugins: [],
}