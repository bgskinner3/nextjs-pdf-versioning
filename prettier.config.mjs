/** @type {import('prettier').Config} */
const config = {
  printWidth: 80,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  plugins: ['prettier-plugin-tailwindcss'],
  endOfLine: 'lf',
  trailingComma: 'all',
};

export default config;
