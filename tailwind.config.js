/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        'white': '#ffffff',
        'ivory': '#f9f6f2',
        'pink': '#e8a5a4',
        'blue': '#92d3d8',
        'dark-gray': '#242424',
        'purple': '#230738',
      },
      fontFamily: { ubuntu: ['Ubuntu', 'sans-serif'] },
      boxShadow: { shadowIn: 'inset 0 2px 20px 0 rgb(0 0 0 / 0.15)' },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
}
