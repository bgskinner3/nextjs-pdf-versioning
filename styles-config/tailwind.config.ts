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
        slideRightAndFade: {
          '0%': { opacity: '0', transform: 'translateX(-4px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideLeftAndFade: {
          '0%': { opacity: '0', transform: 'translateX(4px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideUpAndFade: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },

        slideDownAndFade: {
          '0%': { opacity: '0', transform: 'translateY(-4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeUpAndOut: {
          from: { opacity: '1', transform: 'translateY(0)' },
          to: { opacity: '0', transform: 'translateY(-4px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        contentShow: {
          from: {
            opacity: '0',
            transform: 'translate(-50%, -38%) scale(0.96)',
          },
          to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
        },
        contentClose: {
          from: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
          to: { opacity: '0', transform: 'translate(-50%, -38%) scale(0.96)' },
        },
        skeletonShimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
      },
      animation: {
        shake: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
        shine: 'shine var(--duration) linear infinite',
        slideDownAndFade:
          'slideDownAndFade 100ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade:
          'slideLeftAndFade 100ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideUpAndFade: 'slideUpAndFade 100ms ease-in-out',
        slideRightAndFade: 'slideRightAndFade 100ms ease-in-out',
        fadeUpAndOut: 'fadeUpAndOut  400ms cubic-bezier(0.16, 1, 0.3, 1)', // TOOL TIP
        contentShow: 'contentShow 0.2s ease-in-out', // modal & dialog entry
        contentClose: 'contentClose 0.5s ease-in-out', // modal & dialog exit
      },
      boxShadow: {
        'dark-100': '0px 0px 1px 0px hsl(0 0% 0% / 0.90), 0px 1px 1px 0px #000',
        'dark-200': '0px 0px 1px 0px hsl(0 0% 0% / 0.90), 0px 2px 4px 0px #000',
        'dark-300': '0px 0px 1px 0px hsl(0 0% 0% / 0.90), 0px 4px 8px 0px #000',
        'dark-400':
          '0px 0px 1px 0px hsl(0 0% 0% / 0.90), 0px 8px 16px 0px #000',
        'dark-500':
          '0px 0px 1px 0px hsl(0 0% 0% / 0.90), 0px 16px 24px 0px #000',
        'dark-600':
          '0px 0px 1px 0px hsl(0 0% 0% / 0.90), 0px 24px 40px 0px #000',
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
