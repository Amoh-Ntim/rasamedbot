/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./Components/**/*.{js,jsx,ts,tsx}",
    "./contexts/**/*.{js,jsx,ts,tsx}",
    "./firebase/**/*.{js,jsx,ts,tsx}",
    "./Mode/**/*.{js,jsx,ts,tsx}",
    "./Services/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
