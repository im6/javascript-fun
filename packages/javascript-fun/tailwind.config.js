/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.tsx'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        // @import (css) url('//fonts.googleapis.com/css?family=Oxygen&display=swap');
        sans: ['Oxygen', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        octocatWave: {
          '0%, 100%': { transform: 'rotate(0)' },
          '20%, 60%': { transform: 'rotate(-25deg)' },
          '40%, 80%': { transform: 'rotate(10deg)' },
        },
      },
      animation: {
        octocatWaveAnim: 'octocatWave 560ms ease-in-out',
      },
    },
  },
  plugins: [],
};
