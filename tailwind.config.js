/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Recoleta', 'Georgia', 'serif'],
        body: ['Montserrat', 'sans-serif'],
      },
      colors: {
        barn: {
          50: '#fdf8f6',
          100: '#f8ebe5',
          200: '#f0d5c9',
          300: '#e5b8a4',
          400: '#d6917a',
          500: '#c47055',
          600: '#b15a40',
          700: '#934835',
          800: '#7a3d30',
          900: '#66352b',
        },
        sage: {
          50: '#f6f7f6',
          100: '#e3e7e3',
          200: '#c7d0c7',
          300: '#a3b2a3',
          400: '#7d917d',
          500: '#627462',
          600: '#4d5c4d',
          700: '#404b40',
          800: '#363e36',
          900: '#2f352f',
        },
      },
    },
  },
  plugins: [],
}
