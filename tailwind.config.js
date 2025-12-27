/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        'primary-orange': '#FF6B35',
        'secondary-orange': '#FFB84D',
        'primary-dark': '#E55A2B',
        'dark': '#58595B',
        'dark-light': '#4A4A4A',
        'light': '#F5F5F5',
        'light-dark': '#E0E0E0',
        'accent-wood': '#8B6F47',
        'success': '#10B981',
        'error': '#EF4444',
        'very-dark': '#1a1a1a',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 15s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 0.6s ease',
        'blink': 'blink 1s ease-in-out infinite',
        'grid-move': 'gridMove 20s linear infinite',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}

