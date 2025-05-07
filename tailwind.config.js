/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'typing': 'typing 4s steps(30, end)',
        'typing2': 'typing2 3s steps(38, end) 4s forwards',
        'flicker': 'flicker 3s infinite',
        'pulse': 'pulse 5s infinite',
        'move': 'move 10s infinite',
      },
      fontFamily: {
        'press-start': ['"Press Start 2P"', 'cursive'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
    },
  },
  plugins: [],
}
