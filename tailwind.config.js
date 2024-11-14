/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
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
      white: '#E2E8F0',
      yellow: '#fde047',
      gray: '#3e424a',
      amber: '#FEF9C3',
      blue: '#bae6fd',
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
