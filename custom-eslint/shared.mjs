// .eslint-conf/shared.js
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import globals from 'globals';

const tsParser = tseslint.parser;

const tsParserOptions = {
  project: './tsconfig.json',
  // Note: import.meta.dirname needs to be resolved relative to where the config is used
  // Or handle it in the main file if context is required
  ecmaVersion: 'latest',
  sourceType: 'module',
};
// Define shared plugins once
const sharedPlugins = {
  prettier,
  react,
  'react-hooks': reactHooks,
  '@typescript-eslint': tseslint.plugin,
};
// Define shared language options for JS/TS files
const sharedLanguageOptions = {
  parser: tsParser,
  parserOptions: tsParserOptions,
  globals: {
    ...globals.browser,
    ...globals.node,
  },
};
// Define shared settings for React/TypeScript projects
const sharedSettings = {
  react: { version: 'detect', jsxRuntime: 'automatic' },
  'import/resolver': {
    typescript: true,
    node: true,
  },
};

export {
  tsParser,
  tsParserOptions,
  sharedLanguageOptions,
  sharedPlugins,
  sharedSettings,
};
