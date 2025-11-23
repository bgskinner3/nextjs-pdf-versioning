import type { Config } from 'tailwindcss';

const tailwindConfig: Config = {
  content: [
    './app/**/*.{ts,tsx}', // App Router pages and layouts
    './components/**/*.{ts,tsx}', // components folder
    './pages/**/*.{ts,tsx}', // optional, if you still use pages folder
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8', // Example: your primary color
        secondary: '#9333EA', // Example: secondary color
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      keyframes: {
        shake: {
          '10%, 90%': {
            transform: 'translate3d(-1px, 0, 0)',
          },
          '20%, 80%': {
            transform: 'translate3d(2px, 0, 0)',
          },
          '30%, 50%, 70%': {
            transform: 'translate3d(-4px, 0, 0)',
          },
          '40%, 60%': {
            transform: 'translate3d(4px, 0, 0)',
          },
        },
      },
      animation: {
        shake: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
      },
      container: {
        padding: {
          DEFAULT: '1rem',
          md: '2.5rem',
        },
        center: true,
      },
    },
  },
  plugins: [],

};

export default tailwindConfig;