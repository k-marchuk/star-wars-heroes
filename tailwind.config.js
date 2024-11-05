/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '360px',
      // => @media (min-width: 360px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1366px',
      // => @media (min-width: 1366px) { ... }
    },
    container: {
      center: true,
    },
    colors: {
      white: '#f0f9ff',
      yellow: '#fde047',
      'gray-dark': '#111827',
      gray: '#6b7280',
      'gray-light': '#d1d5db',
    },
    fontFamily: {
      sans: ['Consolas', 'monospace'],
    },
    extend: {
      backgroundImage: {
        background: "url('img/hyperspace-background.jpg')",
      },
    },
  },
  plugins: [require('daisyui')],
};
