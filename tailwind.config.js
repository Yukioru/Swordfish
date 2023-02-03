const { fontFamily, spacing, screens } = require('tailwindcss/defaultTheme');
const windyRadixPalettePlugin = require('windy-radix-palette');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './ui/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: spacing['3'],
        screens: {
          ...screens,
          '2xl': '1440px',
        },
      },
      fontFamily: {
        sans: ['var(--font-manrope)', ...fontFamily.sans],
      },
    },
  },
  plugins: [windyRadixPalettePlugin],
};
