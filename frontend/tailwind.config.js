/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        btgcream: '#FCE7C8',
        btgyellow: '#FADA7A',
        btggreen: '#B1C29E',
        btgorange: '#F0A04B',
      },
      fontFamily: {
        'amatic': ['"Amatic SC"', 'cursive'],
        'libertinus': ['"Libertinus Mono"', 'monospace'],
        'poppins': ['Poppins', 'sans-serif'],
        'rubik': ['Rubik', 'sans-serif'],
        'specialgothic': ['"Special Gothic Expanded One"', 'sans-serif'],
        'winky': ['"Winky Rough"', 'cursive'],
      },
    },
  },
  plugins: [],
} 