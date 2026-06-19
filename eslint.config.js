import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // 'dist' build output; macOS AppleDouble resource-fork files (._*) and
  // .DS_Store artifacts that appear when the repo is synced to a non-HFS
  // filesystem — eslint would otherwise try to parse them and error out.
  globalIgnores(['dist', '**/._*', '**/.DS_Store']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
  {
    // Build-time config runs in Node (e.g. process.env, fetch in the sitemap
    // plugin), so it needs Node globals rather than the browser set above.
    files: ['vite.config.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
])
