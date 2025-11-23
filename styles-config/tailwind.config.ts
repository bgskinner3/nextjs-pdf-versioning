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