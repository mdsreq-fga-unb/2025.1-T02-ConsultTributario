const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  // Configuração global de ignores
  {
    ignores: ['node_modules/**', '.next/**', 'dist/**', 'build/**', 'coverage/**', '**/*.d.ts'],
  },

  // Configurações base do Next.js usando FlatCompat
  ...compat.extends('next/core-web-vitals', 'prettier'),

  // Configurações personalizadas
  {
    rules: {
      // React
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react/jsx-no-useless-fragment': 'error',

      // Imports
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      // General
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-alert': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },

  // Configuração para arquivos de teste
  {
    files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
      'no-console': 'off',
    },
  },

  // Configuração para arquivos de configuração
  {
    files: ['*.config.js', '*.config.ts', '*.config.mjs', '*.setup.js'],
    rules: {
      'import/no-default-export': 'off',
      'no-console': 'off',
    },
  },
];
