/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFD700', // Yellow for primary buttons
          hover: '#FFC000',
        },
        secondary: {
          DEFAULT: '#4A5568', // Gray for secondary buttons
          hover: '#2D3748',
        },
      },
      fontFamily: {
        sans: ['Noto Sans Arabic', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 