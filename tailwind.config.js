// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Press Start 2P"', 'monospace'],
      },
      colors: {
        // Use CSS variables for dynamic theme colors
        highlight: 'var(--highlight-color)',
        'highlight-rgb': 'rgba(var(--highlight-rgb), <alpha-value>)'
      },
      animation: {
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'float': 'float 15s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'blink': 'blink 0.75s step-end infinite',
        'flicker': 'flicker 5s infinite',
        'sparkle': 'skill-sparkle-animation 2s ease-in-out infinite',
        'float-particle': 'float-particle 15s ease-in-out infinite'
      },
      backgroundImage: {
        'radial-grid': 'radial-gradient(rgba(var(--highlight-rgb),0.1) 1px, transparent 1px)'
      },
      backgroundSize: {
        'grid': '40px 40px'
      },
      backdropBlur: {
        'lg': '30px'
      }
    },
  },
  plugins: [],
}