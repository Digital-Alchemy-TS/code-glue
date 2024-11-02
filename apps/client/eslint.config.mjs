import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { FlatCompat } from '@eslint/eslintrc'
import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import reactPlugin from 'eslint-plugin-react'
import hooksPlugin from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const compat = new FlatCompat({
  baseDirectory: __dirname,
})

export default tseslint.config(
  // flat configs
  eslint.configs.recommended,
  reactPlugin.configs.flat.recommended,
  importPlugin.flatConfigs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,

  // yet to be updated, also not currently working
  // ...compat.extends('plugin:valtio/recommended'),

  // react hooks
  {
    plugins: {
      'react-hooks': hooksPlugin,
    },
    rules: {
      ...hooksPlugin.configs.recommended.rules,
    },
  },

  // custom rules
  {
    rules: {
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
          pathGroups: [
            {
              pattern: '!*',
              patternOptions: { nonegate: true, nocomment: true },
              group: 'parent',
              position: 'before',
            },
            {
              pattern: '@tiltshift/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@code-glue/**',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/namespace': 'off',
      'import/no-unresolved': 'off',
      'import/default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-named-as-default': 'off',

      'no-console': 'error',

      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/explicit-function-return-type': ['off'],
      '@typescript-eslint/explicit-module-boundary-types': ['off'],
      '@typescript-eslint/no-empty-function': ['off'],
      '@typescript-eslint/no-explicit-any': ['off'],
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-ignore': 'allow-with-description',
        },
      ],

      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'off',
    },
  },
)
