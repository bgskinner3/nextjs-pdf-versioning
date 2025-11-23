import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import {
  mainConfig,
  tailwindConfig,
  jsConfigRecommended,
  tsLintConfigRecommended,
  globalIgnoresConfig,
} from './custom-eslint/index.mjs';
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  jsConfigRecommended,
  ...tsLintConfigRecommended,
  mainConfig,
  tailwindConfig,
  globalIgnores(globalIgnoresConfig),
]);

export default eslintConfig;
