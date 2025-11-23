import type { Config } from 'tailwindcss';
import { tailwindColors } from './colors';
/** @type {import('tailwindcss').Config} */
const tailwindConfig: Config = {
  content: [
    './app/**/*.{ts,tsx,js,jsx,mdx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './pages/**/*.{ts,tsx}', // optional, if you still use pages folder
  ],

  theme: {
    extend: {
      colors: tailwindColors,
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
        shine: {
          '0%': { 'background-position': '0% 0%' },
          '50%': { 'background-position': '100% 100%' },
          '100%': { 'background-position': '0% 0%' },
        },
      },
      animation: {
        shake: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
        shine: 'shine var(--duration) linear infinite',
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
} satisfies Config;

export default tailwindConfig;
