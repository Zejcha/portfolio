/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse-slow 8s infinite ease-in-out',
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.3' },
          '50%': { transform: 'translate(20px, -20px) scale(1.1)', opacity: '0.5' },
        }
      }
    },
  },
  plugins: [],
}
