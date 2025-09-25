/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f2f6fa',
          100: '#e6edf5',
          200: '#73A2BF',
          300: '#a2b9cf',
          400: '#7fa1bf',
          500: '#5D7CA6',
          600: '#486589',
          700: '#35506f',
          800: '#254059',
          900: '#023059',
          DEFAULT: '#5D7CA6',
        },
        accent: '#F2CAA7',
        brown: '#59362E',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}