// .eslint-conf/index.js
import {
  sharedPlugins,
  sharedLanguageOptions,
  sharedSettings,
} from './shared.mjs';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import tailwindcss from '@poupe/eslint-plugin-tailwindcss';

const mainConfig = {
  files: ['**/*.{js,jsx,ts,tsx}'],
  ignores: ['**/*.mdx'],
  plugins: sharedPlugins,
  languageOptions: sharedLanguageOptions,
  settings: sharedSettings,
  rules: {
    /* prettier-ignore */ 'no-unused-vars': 'off',
    /* prettier-ignore */ '@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
    /* prettier-ignore */ '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    /* prettier-ignore */ '@typescript-eslint/no-explicit-any': 'warn',
    /* prettier-ignore */ 'react-hooks/exhaustive-deps': 'error',
    /* prettier-ignore */ 'prettier/prettier': 'warn',
    /* prettier-ignore */ '@typescript-eslint/no-unused-expressions': [ 'error', { allowShortCircuit: true, allowTernary: true, allowTaggedTemplates: true } ],
  },
};
// /* prettier-ignore */ 'storybook/prefer-pascal-case': 'warn',
const tailwindConfig = {
  files: ['**/*.{ts,tsx,js,jsx}'],
  plugins: {
    ...sharedPlugins,
    tailwindcss,
  },
  rules: {
    'tailwindcss/valid-theme-function': 'error',
    'tailwindcss/valid-modifier-syntax': 'error',
    'tailwindcss/valid-apply-directive': 'error',
    'tailwindcss/no-arbitrary-value-overuse': 'warn',
    'tailwindcss/prefer-theme-tokens': 'warn',
    'tailwindcss/no-conflicting-utilities': 'error',
  },
};

const jsConfigRecommended = js.configs.recommended;
const tsLintConfigRecommended = tseslint.configs.recommended;

const globalIgnoresConfig = [
  'node_modules/**',
  '.next/**',
  'out/**',
  'build/**',
  'next-env.d.ts',
  'tsconfig.tsbuildinfo',
  'eslint-conf/eslint-custom/**',
  '**/*.md',
];
export {
  mainConfig,
  tailwindConfig,
  jsConfigRecommended,
  tsLintConfigRecommended,
  globalIgnoresConfig,
};
