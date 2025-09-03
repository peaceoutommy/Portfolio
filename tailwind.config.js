// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textShadow: {
        sm: 'var(--text-shadow-sm)',
        md: 'var(--text-shadow-md)',
        lg: 'var(--text-shadow-lg)',
      },
      boxShadow: {
        glow: {
          sm: 'var(--box-shadow-sm)',
          md: 'var(--box-shadow-md)',
        }
      },
      transitionProperty: {
        'glow': 'text-shadow, box-shadow, border-color, background-color',
      },
      transitionDuration: {
        '300': '300ms',
      },
      transitionTimingFunction: {
        'standard': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-sm': {
          'text-shadow': 'var(--text-shadow-sm)',
        },
        '.text-shadow-md': {
          'text-shadow': 'var(--text-shadow-md)',
        },
        '.text-shadow-lg': {
          'text-shadow': 'var(--text-shadow-lg)',
        },
        '.box-shadow-glow-sm': {
          'box-shadow': 'var(--box-shadow-sm)',
        },
        '.box-shadow-glow-md': {
          'box-shadow': 'var(--box-shadow-md)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}